function DebugStates(props) {
  return (
    <div className="text-xs bg-gray-100 p-1 border border-gray-400 overflow-x-scroll h-40">
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
}

export default DebugStates;
