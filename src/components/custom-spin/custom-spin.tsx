type TProps = {
  loading: boolean; // Trạng thái loading
  children: React.ReactNode; // Nội dung bên trong (ví dụ: table)
};

function CustomSpin(props: TProps) {
  const { loading, children } = props;
  return (
    <div className="relative">
      <div
        className={`${loading ? 'opacity-70' : 'opacity-100'} transition-opacity`}
      >
        {children}
      </div>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        </div>
      )}
    </div>
  );
}

export default CustomSpin;
