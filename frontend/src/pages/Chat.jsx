import { useEffect } from "react";
import ChatInterface from "../components/ChatInterface";
import Sidebar from "../components/Sidebar";
import ProfileMenu from "../components/Sidebar/ProfileMenu";
import PdfViewer from "../components/PdfViewer"
import EmptyChat from "../components/Chat/EmptyChat"
import {useUIStore} from "../store/useUIStore";
import {useDocumentStore} from "../store/useDocumentStore"
import {useChatStore} from "../store/useChatStore"

const Chat = () => {
  const { isUserMenuOpen, closeUserMenu, isPdfOpen, closePdf } = useUIStore();
  const {selectedDocument} = useDocumentStore()
  const {getRecentChats} = useChatStore()

  useEffect(() => {
    getRecentChats();
  }, [getRecentChats]);

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

      {selectedDocument && isPdfOpen && (
        <>
          {/* Mobile + Tablet */}
          <div className="fixed inset-0 z-30 lg:hidden">
            <PdfViewer
              pdfUrl={selectedDocument.fileUrl}
              closePdf = {closePdf}
            />
          </div>

          {/* Desktop */}
          <div className="hidden lg:block w-[40%] min-w-[350px] max-w-[650px] shrink-0 border-l border-zinc-800/70">
            <PdfViewer
              pdfUrl={selectedDocument.fileUrl}
              closePdf = {closePdf}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;