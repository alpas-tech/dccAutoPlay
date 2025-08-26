'use client';
import { useGlobalContext } from '@/lib/useContext/useGlobalContext';
import { useEffect, useMemo, useRef } from 'react';
import VideoSection from './video-section/VideoSection';

const ServiceList = () => {
  const { serviceIsLoading, serviceList, selectedServiceId, setSelectedServiceId } = useGlobalContext();

  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-select first service
  useEffect(() => {
    if (serviceList?.data?.services?.length && selectedServiceId === null) {
      setSelectedServiceId(serviceList.data.services[0].id);
    }
  }, [serviceList, selectedServiceId, setSelectedServiceId]);

  const selectedService = useMemo(() => {
    return serviceList?.data?.services?.find((item: any) => item.id === selectedServiceId);
  }, [serviceList, selectedServiceId]);

  // Scroll active service into view whenever selectedServiceId changes
  useEffect(() => {
    if (!containerRef.current || selectedServiceId === null) return;
    const activeCard = containerRef.current.querySelector(`#service-card-${selectedServiceId}`) as HTMLElement;
    if (activeCard) {
      activeCard.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [selectedServiceId]);

  return (
    <>
      <div className="primary-blue rounded-xl p-4 shadow-md flex flex-col">
        {serviceIsLoading ? (
          <>Loading...</>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-3">सेवाहरू</h2>
            <div
              ref={containerRef}
              className="grid grid-cols-1 gap-4 lg:max-h-[68vh] 2xl:max-h-[77vh] overflow-y-auto no-scrollbar"
            >
              {serviceList?.data?.services?.map((item: any) => (
                <div
                  key={item.id}
                  id={`service-card-${item.id}`}
                  onClick={() => setSelectedServiceId(item.id)}
                  className={`p-4 py-10 rounded-xl cursor-pointer shadow-md text-center transition-transform duration-200 ${
                    selectedServiceId === item.id
                      ? 'bg-white border border-blue-700 text-[#3B82F6] font-semibold'
                      : 'bg-[#2563EB] text-white hover:bg-[#06375f]'
                  }`}
                >
                  <h3 className="font-semibold text-2xl">{item.title}</h3>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <VideoSection
        selectedService={selectedService}
        serviceList={serviceList}
        selectedServiceId={selectedServiceId}
        setSelectedServiceId={setSelectedServiceId}
      />
    </>
  );
};

export default ServiceList;
