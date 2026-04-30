export function AccentBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="absolute left-[-3rem] top-[6vh] size-[15rem] rounded-full bg-rose-500/14 blur-[80px]" />
      <div className="absolute right-[8vw] top-[12vh] size-[14rem] rounded-full bg-rose-600/12 blur-[80px]" />
      <div className="absolute left-[-4rem] top-[42vh] size-[18rem] rounded-full bg-rose-700/10 blur-[90px]" />
      <div className="absolute right-[-3rem] top-[55vh] size-[16rem] rounded-full bg-rose-500/12 blur-[80px]" />
      <div className="absolute left-[28vw] top-[78vh] size-[14rem] rounded-full bg-rose-600/12 blur-[80px]" />
      <div className="absolute right-[18vw] top-[92vh] size-[20rem] rounded-full bg-rose-500/12 blur-[100px]" />

      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
    </div>
  );
}
