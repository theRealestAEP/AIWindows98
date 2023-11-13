interface DesktopIconProps {
    label: string;
    imageSrc: string;
    onClick: () => void;
  }
  
  const DesktopIcon: React.FC<DesktopIconProps> = ({ label, imageSrc, onClick }) => {
    return (
      <div onClick={onClick} className='desktop-icon'>
        <img src={imageSrc} alt={label} /> {/* Add this line */}
        <div>{label}</div>
      </div>
    );
  };
  
  export default DesktopIcon;