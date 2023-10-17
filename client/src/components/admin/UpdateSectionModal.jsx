/* eslint-disable react/prop-types */
import { useNavigate, useParams, useRevalidator } from 'react-router-dom';
import customFetch from '../../utils/customFetch';
import { toast } from 'react-toastify';
import UpsertSectionModal from './UpsertSectionModal';
import { useEffect, useState } from 'react';

const UpdateSectionModal = ({ isVisible, setIsVisible }) => {
  const [section, setSection] = useState(null);

  const { sectionName } = useParams();
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  useEffect(() => {
    const fetchSection = async () => {
      const { data: fetchedSection } = await customFetch(
        `/sectionsByName/${sectionName}`
      );
      setSection(fetchedSection);
    };
    if (sectionName) {
      fetchSection();
    }
  }, [sectionName]);

  const updateSection = async (newName) => {
    try {
      const {
        data: { section: updatedSection },
      } = await customFetch.patch(`/sections/${section._id}`, {
        name: newName,
      });
      setIsVisible(false);
      navigate(`/admin/${updatedSection.friendlyUrlName}`);
      revalidator.revalidate();
      toast.success(`Sección '${updatedSection.name}' actualizada con éxito`);
    } catch (error) {
      console.log(error);
      toast.error(`Algo ha salido mal: ${error?.message}`);
    }
  };

  const deleteSection = async () => {
    try {
      const {
        data: { section: deletedSection },
      } = await customFetch.delete(`/sections/${section._id}`);
      setIsVisible(false);
      navigate(`/admin`);
      revalidator.revalidate();
      toast.success(`Sección '${deletedSection.name}' eliminada con éxito`);
    } catch (error) {
      console.log(error);
      toast.error(`Algo ha salido mal: ${error?.message}`);
    }
  };

  return (
    <UpsertSectionModal
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      title="Actualizar sección"
      defaultName={section?.name}
      upsertSection={updateSection}
      deleteSection={deleteSection}
    />
  );
};
export default UpdateSectionModal;
