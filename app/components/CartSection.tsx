import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import SparkButton from './SparkButton';

interface CartSectionProps {
  color: string | number | boolean;
  updateColor: (color: string | number | boolean) => void;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  AddToCart: () => void;
}

const CartSection: React.FC<CartSectionProps> = ({ color, updateColor, quantity, setQuantity, AddToCart }) => {
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity)) {
      setQuantity(newQuantity);
    }
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(0, prev - 1));

  const colorOptions: Array<{ value: number; bgColor: string }> = [
    { value: 0, bgColor: '#FF712B' },
    { value: 1, bgColor: '#F03939' },
    { value: 2, bgColor: '#1E8D75' },
    { value: 3, bgColor: '#7D3DC6' },
    { value: 4, bgColor: '#2459AC' },
  ];

  return (
    <div>
      <section
        id="section-5"
        style={{ bottom: '-200px', opacity: 0 }}
        className="transition-all fixed left-0 flex justify-center xl:h-[200px] px-3 w-full text-[18px] xs:text-[20px]"
      >
        <div className="flex flex-col mid:flex-row justify-center gap-6 mid:gap-14 xl:gap-16 w-full max-w-[500px] sm:max-w-[588px] mid:max-w-none min-h-0 h-max">
          <div>
            <h3 className="mb-6">Colour:</h3>
            <div className="flex justify-center gap-6">
              {colorOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => updateColor(option.value)}
                  className="flex justify-center items-center w-[42px] xs:w-[46px] sm:w-[48px] aspect-square rounded-full cursor-pointer hover:drop-shadow-small"
                  style={{ backgroundColor: option.bgColor }}
                >
                  {color === option.value && <FontAwesomeIcon icon={faCheck} />}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-6">Quantity:</h3>
            <div className="flex justify-between w-full max-w-[400px] border-2 border-white rounded-[3px] mx-auto xl:mx-0">
              <input
                type="number"
                onChange={handleQuantityChange}
                value={quantity}
                placeholder="Choose quantity"
                className="bg-transparent outline-none flex-1 mid:max-w-[200px] py-1 sm:py-3 pl-4 text-[18px] xs:text-[20px] appearance-none"
              />
              <div className="w-[30px] flex flex-col">
                <button
                  onClick={incrementQuantity}
                  className="flex-1 text-gray-800 hover:bg-[#111111] cursor-pointer"
                >
                  <FontAwesomeIcon className="translate-y-[1px] text-[18px] text-white" icon={faChevronUp} />
                </button>
                <button
                  onClick={decrementQuantity}
                  disabled={quantity < 1}
                  className="flex-1 text-gray-800 hover:bg-[#111111] cursor-pointer"
                >
                  <FontAwesomeIcon className="translate-y-[-1px] text-[18px] text-white" icon={faChevronDown} />
                </button>
              </div>
            </div>
          </div>
          <SparkButton
            onClick={AddToCart}
            disabled={quantity < 1 || color === 5}
            className={`mid:self-end w-full mid:w-[165px] xl:w-[180px] max-w-[400px] mid:h-[64px] mx-auto mid:mx-0 py-[10px] sm:py-3 px-4 rounded-[3px] border-2 bg-transparent relative transition-all duration-300 ${
              quantity < 1 || color === 5 ? 'border-[#353535] text-[#353535]' : 'border-white text-white'
            }`}
          >
            Add To Cart
          </SparkButton>
        </div>
      </section>
    </div>
  );
};

export default CartSection;