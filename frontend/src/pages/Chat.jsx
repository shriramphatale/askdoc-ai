import ChatInterface from "../components/ChatInterface";
import Sidebar from "../components/Sidebar";
import ProfileMenu from "../components/Sidebar/ProfileMenu";
import PdfViewer from "../components/PdfViewer"
import EmptyChat from "../components/Chat/EmptyChat"
import {useUIStore} from "../store/useUIStore";
import {useDocumentStore} from "../store/useDocumentStore"

const Chat = () => {
  const { isUserMenuOpen, closeUserMenu } = useUIStore();
  const {selectedDocument} = useDocumentStore()
  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-[#09090B] text-[#FAFAFA]">
      <Sidebar />
      { isUserMenuOpen && ( 
        <> 
          <div className="fixed inset-0 z-40" onClick={closeUserMenu}/> <ProfileMenu /> 
        </>
      ) }

      <div className="min-w-0 flex-1">
        {!selectedDocument ? (<EmptyChat/>) : (<ChatInterface />) }
        
      </div>

      {selectedDocument && (
        <div className="hidden lg:block w-[40%] min-w-[350px] max-w-[650px] shrink-0 border-l border-zinc-800/70">
          <PdfViewer
            pdfUrl={selectedDocument.fileUrl}
          />
        </div>
      )}
    </div>
  );
};

export default Chat;