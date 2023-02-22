import {ModalForm,} from '@ant-design/pro-components';
import ProCard from "@/components/ProCard";


export default (record: { record: { id: API.DeleteUserParam; }; }) => {
  // const [modalVisit, setModalVisit] = useState(false);
  return (
    <ModalForm
      // open={modalVisit}
      // onOpenChange={setModalVisit}

      submitter={{
        render: (props, defaultDoms) => {
          return [
            // ...defaultDoms,
          ];
        },
      }}
      title="课程详情"
      trigger={
        <a type="primary">
          详情
        </a>
      }

      modalProps={{
        destroyOnClose: true,
        // onCancel: () => console.log('run'),
      }}
    >
      <ProCard/>
    </ModalForm>
  );
};
