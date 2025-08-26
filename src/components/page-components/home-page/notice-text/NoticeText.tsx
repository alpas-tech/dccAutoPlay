import { useApiQuery } from '@/lib/react-query/useReactQuery';
import { useGlobalContext } from '@/lib/useContext/useGlobalContext';

const NoticeText = () => {
  const { loginSuccess } = useGlobalContext();
  const {
    data: noticeList,
    error: noticeError,
    isLoading: noticeIsLoading,
  } = useApiQuery({
    axiosOptions: {},
    enabled: loginSuccess,
    queryKey: ['notices-list'],
    endpoint: '/notices',
  });

  const notices = noticeList?.data?.notices || [];

  return (
    <section className="h-12 flex items-center overflow-hidden primary-blue">
      {/* Red arrow label */}
      <div className="flex items-center relative z-40">
        <div className="bg-red-600 text-white font-bold px-4 h-12 flex items-center">
          <span>सुचना</span>
        </div>
        {/* Arrow */}
        <div className="w-0 h-0 border-t-[24px] border-b-[24px] border-l-[10px] border-t-transparent border-b-transparent border-l-red-600"></div>
      </div>

      {/* Notice text area */}
      {noticeIsLoading ? (
        <></>
      ) : (
        <div className="whitespace-nowrap animate-marquee">
          {notices.map((notice: any) => (
            <span key={notice.id} className="inline-block mx-8 text-lg text-white">
              {notice.title}
            </span>
          ))}
        </div>
      )}
    </section>
  );
};

export default NoticeText;
