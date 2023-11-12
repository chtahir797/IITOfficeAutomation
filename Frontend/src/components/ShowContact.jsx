import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import { ImagePopup, Navigate } from "./Useful";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BaseUrl from "./BaseUrl";
import ReactModal from "react-modal";
function ShowContact() {
    const [contactData, setContactData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedContact, setSelectedContact] = useState(null);
    const [showReplyPopup, setShowReplyPopup] = useState(false);
    const [replyText, setReplyText] = useState("");
    const [showImagePopup, setShowImagePopup] = useState(false);
    const [popupImageUrl, setPopupImageUrl] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const contactsPerPage = 7; // Number of contacts to show per page

    axios.defaults.withCredentials = true;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/contact`);
            const reversedData = response.data.reverse();
            setContactData(reversedData);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleOpenImagePopup = (imageUrl) => {
        setShowImagePopup(true);
        setPopupImageUrl(imageUrl);
    };

    const handleCloseImagePopup = () => {
        setShowImagePopup(false);
        setPopupImageUrl("");
    };

    const handleOpenReplyPopup = (contact) => {
        setSelectedContact(contact);
        setShowReplyPopup(true);
    };

    const handleCloseReplyPopup = () => {
        setSelectedContact(null);
        setReplyText("");
        setShowReplyPopup(false);
    };


    const handleReplySubmit = async () => {
        if (!replyText.trim()) {
            // Show error toast message if reply text is blank
            toast.error("Please enter a valid reply.", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            return;
        }
        try {
            await axios.post(`${BaseUrl}/contact/${selectedContact._id}/reply`, {
                text: replyText,
                withCredentials: true,
            });

            fetchData();
            handleCloseReplyPopup();
            // Show success toast message
            toast.success("Reply submitted successfully!", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteContact = async (contactId) => {
        try {
            const response = await axios.delete(`${BaseUrl}/contact/${contactId}`);
            if (response.status === 200) {
                toast.success("Contact deleted successfully!", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
                fetchData(); // Fetch updated contact data
            }
            fetchData();
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete contact.", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    };

    // Get current contacts based on currentPage
    const indexOfLastContact = currentPage * contactsPerPage;
    const indexOfFirstContact = indexOfLastContact - contactsPerPage;
    const currentContacts = contactData.slice(indexOfFirstContact, indexOfLastContact);

    const hasMoreNextContacts = contactData.length > contactsPerPage * currentPage;
    const hasPreviousContacts = currentPage > 1;

    // Next page button
    const handleNextPage = () => {
        setCurrentPage((prev) => prev + 1);
    };

    // Previous page button
    const handlePreviousPage = () => {
        setCurrentPage((prev) => prev - 1);
    };

    return (
        <div className="w-full overflow-x-hidden border-t flex flex-col">
            <main className="w-full flex-grow p-6">
                {loading ? (
                    <Loader />
                ) : (
                    <div className="w-full">
                        <div className="bg-white overflow-auto">
                            <table className="min-w-full bg-white">
                                <thead className="bg-gray-800 text-white">
                                    <tr>
                                        <th className="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">
                                            Name
                                        </th>
                                        <th className="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">
                                            Email
                                        </th>
                                        <th className="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">
                                            Subject
                                        </th>
                                        <th className="w-2/6 text-left py-3 px-4 uppercase font-semibold text-sm">
                                            Message
                                        </th>
                                        <th className="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">
                                            File
                                        </th>
                                        <th className="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                    {currentContacts.map((contact) => (
                                        <tr key={contact._id}>
                                            <td className="text-left py-3 px-4">{contact.name}</td>
                                            <td className="text-left py-3 px-4">{contact.email}</td>
                                            <td className="text-left py-3 px-4">{contact.subject}</td>
                                            <td className="text-left py-3 px-4">{contact.message}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {contact.file_upload && (
                                                    <img
                                                        src={contact.file_upload}
                                                        alt=""
                                                        onClick={() => handleOpenImagePopup(contact.file_upload)}
                                                        className="cursor-pointer max-h-10 w-auto"
                                                    />
                                                )}
                                            </td>

                                            <td className="text-left py-3 px-4">
                                                <div className="flex justify-between items-center">
                                                    <button
                                                        className="px-4 py-1 text-white font-light tracking-wider bg-blue-500 rounded"
                                                        onClick={() => handleOpenReplyPopup(contact)}
                                                    >
                                                        Reply
                                                    </button>
                                                    <button
                                                        className="px-4 py-1 ml-2 text-white font-light tracking-wider bg-red-500 rounded"
                                                        onClick={() => handleDeleteContact(contact._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {showImagePopup && (
                            <ImagePopup imageUrl={popupImageUrl} onClose={handleCloseImagePopup} />
                        )}
                        {showReplyPopup && (
                            <ReactModal
                                isOpen={showReplyPopup}
                                onRequestClose={handleCloseReplyPopup}
                                overlayClassName="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-900"
                                className="bg-white rounded-lg p-6 shadow-md w-96 outline-none"
                                contentLabel="Reply Popup"
                            >
                                <div>
                                    <p className="text-xl font-semibold mb-4">Reply to {selectedContact.name}</p>
                                    <textarea
                                        className="w-full px-3 py-2 mb-4 text-gray-700 bg-gray-100 rounded-md resize-none focus:outline-none focus:ring focus:border-blue-500"
                                        rows="4"
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        placeholder="Enter your reply..."
                                    />
                                    <div className="mt-6 flex justify-end space-x-4">
                                        <button
                                            className="px-6 py-2 text-white font-semibold bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
                                            onClick={handleReplySubmit}
                                        >
                                            Send
                                        </button>
                                        <button
                                            className="px-6 py-2 text-white font-semibold bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-500"
                                            onClick={handleCloseReplyPopup}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </ReactModal>
                        )}

                    </div>
                )}
                <div className="flex justify-between items-center">
                    <Navigate
                        handlePreviousPage={handlePreviousPage}
                        showPreviousButton={hasPreviousContacts}
                    />
                    <Navigate
                        handleNextPage={handleNextPage}
                        showNextButton={hasMoreNextContacts}
                    />
                </div>
            </main>
            <ToastContainer />
        </div>
    );
}

export default ShowContact;
