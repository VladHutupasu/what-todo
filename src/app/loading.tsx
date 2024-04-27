import ClipboardIcon from '@heroicons/react/24/outline/ClipboardIcon';

export default function Loading() {
  return (
    <>
      <div className="flex items-center justify-center h-full">
        <ClipboardIcon className="animate-bounce h-8 w-8 text-primary" />
      </div>
    </>
  );
}
