/* eslint-disable react/prop-types */
import { useNavigate, useRevalidator } from 'react-router-dom';
import customFetch from '../../utils/customFetch';
import { toast } from 'react-toastify';
import UpsertSectionModal from './UpsertSectionModal';

const CreateSectionModal = ({ isVisible, setIsVisible }) => {
  const revalidator = useRevalidator();
  const navigate = useNavigate();

  const createSection = async (name) => {
    try {
      const {
        data: { section: createdSection },
      } = await customFetch.post('/sections', {
        name,
      });
      setIsVisible(false);
      revalidator.revalidate();
      navigate(`/admin/${createdSection.friendlyUrlName}`);
      toast.success(`Sección '${createdSection.name}' creada con éxito`);
    } catch (error) {
      console.log(error);
      toast.error(`Algo ha salido mal: ${error?.message}`);
    }
  };

  return (
    <UpsertSectionModal
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      title="Crear sección"
      upsertSection={createSection}
    />
  );
};
export default CreateSectionModal;
