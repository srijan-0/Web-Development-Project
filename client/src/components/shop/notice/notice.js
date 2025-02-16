import React, { useEffect, useState } from "react";
import Layout from "../layout"; // Import Layout component
import { getAllNotices } from "./FetchApi"; // Import API function

export const Noticeshop = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedNotices, setExpandedNotices] = useState({});

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                let response = await getAllNotices();
                if (response.notices) {
                    setNotices(response.notices);
                }
            } catch (error) {
                console.error("Error fetching notices:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotices();
    }, []);

    // Function to format the time
    const formatTime = (time) => {
        if (!time) return "Unknown Time";
        const date = new Date(time);
        return date.toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        });
    };

    // Toggle Read More
    const toggleReadMore = (nId) => {
        setExpandedNotices((prev) => ({
            ...prev,
            [nId]: !prev[nId],
        }));
    };

    if (loading) {
        return <div className="text-center text-gray-600 mt-5">Loading...</div>;
    }

    return (
        <Layout>
            <div className="max-w-6xl mx-auto p-4 mt-10">
                <h1 className="text-2xl font-bold mb-6 text-center">All Notices</h1>

                {/* Grid Layout - 3 notices per row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {notices.length > 0 ? (
                        notices.map((notice) => {
                            const isExpanded = expandedNotices[notice.nId];
                            const truncatedText =
                                notice.description.length > 100
                                    ? `${notice.description.slice(0, 100)}...`
                                    : notice.description;

                            return (
                                <div
                                    key={notice.nId}
                                    className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex flex-col"
                                    style={{ minHeight: "auto", wordWrap: "break-word" }} // Flexible height & text wrap
                                >
                                    {/* Notice Header */}
                                    <h2 className="text-lg font-semibold">{notice.title}</h2>

                                    {/* Author and Date */}
                                    <p className="text-sm text-gray-500 mt-2">
                                        {notice.author} • {formatTime(notice.time)}
                                    </p>

                                    {/* Notice Description */}
                                    <p className="text-gray-700 mt-2">
                                        {isExpanded ? notice.description : truncatedText}
                                    </p>

                                    {/* Read More Button */}
                                    {notice.description.length > 100 && (
                                        <div className="mt-4 text-right">
                                            <button
                                                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500"
                                                onClick={() => toggleReadMore(notice.nId)}
                                            >
                                                {isExpanded ? "Read Less" : "Read More"}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-gray-500 col-span-3 text-center">No notices available.</p>
                    )}
                </div>
            </div>
        </Layout>
    );
};
