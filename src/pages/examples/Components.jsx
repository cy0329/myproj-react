import Alert from 'components/Alerts';

function Components() {
  return (
    <div>
      <h2 className="text-lg border-l-8 border-blue-400 pl-2 mb-2">
        Components
      </h2>
      <h3 className="text-lg border-l-4 border-blue-400 pl-2 mb-2">Alerts</h3>
      <Alert type="info" message="info 메세지입니다." />
      <Alert type="success" message="success 메세지입니다." />
      <Alert type="danger" message="danger 메세지입니다." />
    </div>
  );
}

export default Components;
