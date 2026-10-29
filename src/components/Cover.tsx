type CoverProps = {
  src: string;
  alt: string;
  className?: string;
};

export default function Cover({ src, alt, className = "" }: CoverProps) {
  return (
    <div className={`cover ${className}`.trim()} role="img" aria-label={alt}>
      <div className="cover-art" style={{ backgroundImage: `url("${src}")` }} />
    </div>
  );
}
