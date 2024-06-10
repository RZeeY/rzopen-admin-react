import './index.less';
import welcome from '../../assets/images/home/welcome.svg';

export function Component() {
  return (
    <>
      <div className='h-container'>
        <img src={welcome} className='welcome-img' />
        <h1 className='welcome-text'>欢迎使用 {import.meta.env.VITE_PRODUCT_NAME}</h1>
      </div>
    </>
  );
}
