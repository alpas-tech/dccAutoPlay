'use client';
import { useEffect, useRef } from 'react';

const VideoSection = ({
  selectedService,
  serviceList,
  selectedServiceId,
  setSelectedServiceId,
}: {
  selectedService: any;
  serviceList: any;
  selectedServiceId: number | null;
  setSelectedServiceId: (id: number) => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-skip if no video
  useEffect(() => {
    if (!selectedService?.video_url && serviceList?.data?.services?.length) {
      const currentIndex = serviceList.data.services.findIndex((s: any) => s.id === selectedServiceId);
      const nextIndex = (currentIndex + 1) % serviceList.data.services.length;
      setSelectedServiceId(serviceList.data.services[nextIndex].id);
    }
  }, [selectedService, selectedServiceId, serviceList, setSelectedServiceId]);

  // Handle video ended
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const handleEnded = () => {
      if (!serviceList?.data?.services) return;
      const currentIndex = serviceList.data.services.findIndex((s: any) => s.id === selectedServiceId);
      const nextIndex = (currentIndex + 1) % serviceList.data.services.length;
      setSelectedServiceId(serviceList.data.services[nextIndex].id);
    };

    videoEl.addEventListener('ended', handleEnded);

    return () => {
      videoEl.removeEventListener('ended', handleEnded);
    };
  }, [selectedServiceId, serviceList, setSelectedServiceId]);

  return (
    <div className="primary-blue rounded-xl p-4 shadow-md col-span-2 flex flex-col items-center justify-center">
      {/* <h2 className="text-xl font-bold mb-3">Service Video</h2> */}

      {selectedService?.video_url ? (
        <video
          ref={videoRef}
          className="w-full max-w-5xl h-64 sm:h-80 md:h-full rounded-lg"
          src={selectedService.video_url}
          autoPlay
          muted
          loop={false}
          controls
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="w-full max-w-5xl h-64 sm:h-80 md:h-96 rounded-lg bg-primary-blue flex items-center justify-center text-white">
          {/* Loading Animation */}
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-white rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div className="w-4 h-4 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoSection;
