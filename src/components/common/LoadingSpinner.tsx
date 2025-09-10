import ClipLoader from "react-spinners/ClipLoader";

interface ILoadingSpinnerProps {
  size?: number;
  color?: string;
  height?: string;
  borderWidth?: string;
}

const LoadingSpinner = ({
  size = 50,
  color = "#252525",
  height = "100%",
  borderWidth = "5px",
}: ILoadingSpinnerProps) => {
  return (
    <div
      className={`w-[100%] h-[var(--ctmHeight)] flex items-center justify-center`}
      style={{ "--ctmHeight": height } as React.CSSProperties}
    >
      <ClipLoader
        color={color}
        size={size}
        cssOverride={{
          borderWidth,
          animation: "clip-spin 0.75s linear infinite",
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
