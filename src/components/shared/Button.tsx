export interface ButtonProps {
  text: string;
  variant: "primary" | "secondary";
  marginTop: 4 | 8;
  onClick: () => void;
}

export default function Button(props: ButtonProps) {
  return (
    <button className={`btn btn-${props.variant} mt-${props.marginTop}`} onClick={props.onClick}>
      {props.text}
    </button>
  );
}
