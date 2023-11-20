interface DesktopIconProps {
    label: string;
    imageSrc: string;
    onClick: () => void;
  }
  
  import Image from 'next/image';

  const DesktopIcon: React.FC<DesktopIconProps> = ({ label, imageSrc, onClick }) => {
    return (
      <div onClick={onClick} className='desktop-icon'>
        <Image src={imageSrc} alt={label} height={100} width={100}  /> {/* Add this line */}
        <div>{label}</div>
      </div>
    );
  };
  
  export default DesktopIcon;