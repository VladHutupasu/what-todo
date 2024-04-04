export default function Header() {
  return (
    <>
      <h1 className="text-3xl mt-4">What Todo 📋</h1>

      <p className="text-sm self-start border border-b border-gray-200 rounded-xl p-4 mt-4 lg bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit dark:bg-zinc-800/30">
        Get started by adding a&nbsp;
        <code className="font-mono font-bold">Todo</code>
      </p>
    </>
  );
}
