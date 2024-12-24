import React, { useState } from "react";

function App() {
    const [urls, setUrls] = useState("");
    const [isProfile, setIsProfile] = useState(true);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleCrawl = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://backend-for-wc.onrender.com/crawl", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ urls: urls.split("\\n"), isProfile }),
            });
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>LinkedIn Crawler</h1>
            <textarea
                rows="5"
                cols="50"
                value={urls}
                onChange={(e) => setUrls(e.target.value)}
                placeholder="Enter LinkedIn profile or company URLs (one per line)"
            ></textarea>
            <br />
            <label>
                <input
                    type="radio"
                    name="type"
                    checked={isProfile}
                    onChange={() => setIsProfile(true)}
                />
                Profiles
            </label>
            <label>
                <input
                    type="radio"
                    name="type"
                    checked={!isProfile}
                    onChange={() => setIsProfile(false)}
                />
                Companies
            </label>
            <br />
            <button onClick={handleCrawl} disabled={loading}>
                {loading ? "Crawling..." : "Start Crawling"}
            </button>
            <div>
                <h2>Results</h2>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
        </div>
    );
}

export default App;
