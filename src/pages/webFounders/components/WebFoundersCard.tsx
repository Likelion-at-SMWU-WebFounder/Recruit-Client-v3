import { useState } from 'react';
import WebFoundersCardFront from './WebFoundersCardFront';
import WebFoundersCardBack from './WebFoundersCardBack';

interface Props {
  name: string;
  no: string;
  part: string;
  image: string;
  responsibilities?: string;
}

const WebFoundersCard = ({ name, no, part, image, responsibilities }: Props) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative h-[15.5rem] w-full [perspective:1500px] md:h-[26rem] lg:h-[32.5rem]">
      <div
        className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
        {/* 앞면 */}
        <WebFoundersCardFront name={name} no={no} part={part} image={image} onFlip={() => setIsFlipped(true)} />

        {/* 뒷면 */}
        <WebFoundersCardBack
          name={name}
          no={no}
          part={part}
          image={image}
          responsibilities={responsibilities}
          onFlipBack={() => setIsFlipped(false)}
        />
      </div>
    </div>
  );
};

export default WebFoundersCard;
