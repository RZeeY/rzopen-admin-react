// React
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// antd
import { Form, Input, Select, Space, Button, Spin } from 'antd';
// stylesheet
import './index.less';
// other
import { FORM_ITEM_LAYOUT, FORM_INPUT_MAXLENGTH, FORM_ITEM_BUTTONS_LAYOUT, NAVIGATE_INTERVAL, ARTICLE_TYPES } from '../../../../constant/index';
import { useComputeSelectOption, useMsg } from '../../../../global';
import validateRules from '../../../../form-validate-rules/content-management/add/index';
import 'tinymce/tinymce.min.js';
import 'tinymce/themes/silver/theme.min.js';
import 'tinymce/models/dom/model.min.js';
import 'tinymce/icons/default/icons.min.js';
import 'tinymce/skins/ui/oxide/skin.min.css';

export function Component() {
  const navigate = useNavigate();
  const { successMsg } = useMsg();
  const [loading, setLoading] = useState(false);
  const mainForm = useRef(null);
  const editor = useRef(null);
  const articleType = useComputeSelectOption(ARTICLE_TYPES);
  let [mainFormData, setMainFormData] = useState({
    title: '',
    type: null,
    article: '',
  });

  useEffect(() => {
    tinymce.init({
      selector: '#editor',
      height: 600,
      setup: function (editor) {
        editor.on('blur', function (e) {
          handleMainFormEditorBlur(e);
        });
      },
    });
    return () => {
      tinymce.remove();
    };
  }, []);

  function handleMainFormTitleInputChange(ev) {
    setMainFormData({ ...mainFormData, title: ev.target.value });
  }

  function handleMainFormTypeSelectChange(val) {
    setMainFormData({ ...mainFormData, type: val });
  }

  function handleMainFormEditorBlur(ev) {
    const form = mainForm.current;
    const val = ev.target.getContent();
    setMainFormData(state => {
      return {
        ...state,
        article: val,
      };
    });
    form.setFieldValue('article', val);
    form.validateFields(['article']);
  }

  function handleMainFormSubmitBtnClick() {
    const val = tinymce.get('editor').getContent();
    mainForm.current.setFieldValue('article', val);
    setMainFormData({ ...mainFormData, article: val });
  }

  function handleMainFormCancelBtnClick() {
    navigate('../list');
  }

  function handleMainFormFinish() {
    // 这里是模拟提交成功的网络请求
    console.log(mainFormData);
    setLoading(true);
    setTimeout(() => {
      successMsg('提交成功');
      setTimeout(() => {
        setLoading(false);
        navigate('../list');
      }, NAVIGATE_INTERVAL);
    }, Math.random() * 3000);
  }

  return (
    <>
      <div className='cma-container'>
        <Spin spinning={loading}>
          <div className='global-form-center-container'>
            <Form ref={mainForm} {...FORM_ITEM_LAYOUT} validateTrigger='onBlur' onFinish={handleMainFormFinish}>
              <Form.Item label='标题' name='title' rules={validateRules.title}>
                <Input placeholder='标题' maxLength={FORM_INPUT_MAXLENGTH} onChange={handleMainFormTitleInputChange} />
              </Form.Item>
              <Form.Item label='分类' name='type' rules={validateRules.type}>
                <Select
                  style={{
                    width: 120,
                  }}
                  options={articleType}
                  placeholder='分类'
                  value={mainFormData.type}
                  allowClear={true}
                  onChange={handleMainFormTypeSelectChange}
                />
              </Form.Item>
              <Form.Item label='正文' name='article' rules={validateRules.article}>
                <div id='editor' ref={editor}>
                  Hellow World 😋
                </div>
              </Form.Item>
              <Form.Item {...FORM_ITEM_BUTTONS_LAYOUT}>
                <Space>
                  <Button type='primary' htmlType='submit' onClick={handleMainFormSubmitBtnClick}>
                    提交
                  </Button>
                  <Button onClick={handleMainFormCancelBtnClick}>取消</Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
        </Spin>
      </div>
    </>
  );
}
