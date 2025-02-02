import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; // Import Navbar component

const SetupOrganization = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyWebsite: "",
    companyDescription: "",
  });
  const [metaDescription, setMetaDescription] = useState("");
  const [webpages, ] = useState([
    { id: 1, url: "https://example.com/page1", status: "Scraped", chunks: ["Data chunk 1", "Data chunk 2"] },
    { id: 2, url: "https://example.com/page2", status: "Pending", chunks: [] },
    { id: 3, url: "https://example.com/page3", status: "Scraped", chunks: ["Data chunk A", "Data chunk B"] },
  ]);


  
  const [selectedPage, setSelectedPage] = useState(null);
  const [trainingProgress, setTrainingProgress] = useState(50);
  const [fetchedData, setFetchedData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if no token is found in localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchMetaDescription = () => {
    // Dummy meta-description fetch logic
    setMetaDescription("This is a meta-description fetched from the website URL.");
    setFormData({ ...formData, companyDescription: "This is a meta-description fetched from the website URL." });
  };

  const handlePageClick = async (page) => {
    setSelectedPage(page);

    // Fetch data from the provided URL when a page is clicked
    try {
      const response = await fetch("https://apex.oracle.com/pls/apex/tusharapex1/dept_id/seq/");
      if (response.ok) {
        const data = await response.json(); // Assuming the API returns JSON data
        setFetchedData(data); // Set the fetched data
      } else {
        console.error("Failed to fetch data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleNextStep = () => {
    alert("Moving to the next step...");
  };

  return (
    <div>
      <Navbar /> {/* Navbar placed at the top */}

      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-6 border border-gray-200 p-4 rounded">
          <div className="mb-4">
            <h1 className="text-xl font-bold mb-4">Setup Organization You can use Bot for more info</h1>
            <label className="block text-sm font-medium mb-2">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Enter company name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Company Website URL</label>
            <div className="flex gap-2">
              <input
                type="text"
                name="companyWebsite"
                value={formData.companyWebsite}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="Enter website URL"
              />
              <button
                className="bg-blue-500 text-white p-2 rounded"
                onClick={fetchMetaDescription}
              >
                Fetch Meta-Description
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Company Description</label>
            <textarea
              name="companyDescription"
              value={formData.companyDescription || metaDescription}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Enter company description"
              rows="4"
            />
          </div>
        </div>

        <div className="mb-6 border border-gray-200 p-4 rounded">
          <h2 className="text-lg font-bold mb-4">Detected Webpages</h2>
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border p-2">URL</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {webpages.map((page) => (
                <tr key={page.id} className="hover:bg-gray-100">
                  <td className="border p-2">{page.url}</td>
                  <td className="border p-2">{page.status}</td>
                  <td className="border p-2">
                    <button
                      className="bg-gray-500 text-white p-2 rounded"
                      onClick={() => handlePageClick(page)}
                    >
                      View Data
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedPage && (
          <div className="mb-6 border border-gray-200 p-4 rounded">
            <h3 className="text-lg font-bold mb-2">Scraped Data: {selectedPage.url}</h3>
            {fetchedData ? (
              <pre>{JSON.stringify(fetchedData, null, 2)}</pre> // Display fetched data in JSON format
            ) : (
              <p>No data fetched yet.</p>
            )}
          </div>
        )}

        <div className="border border-gray-200 p-4 rounded">
          <h2 className="text-lg font-bold mb-4">Chatbot Training Progress</h2>
          <div className="mb-4 relative bg-gray-200 h-4 rounded">
            <div
              style={{ width: `${trainingProgress}%` }}
              className="absolute top-0 left-0 h-full bg-blue-500 rounded"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              className="bg-blue-500 text-white p-2 rounded"
              onClick={() => setTrainingProgress((prev) => Math.min(prev + 10, 100))}
            >
              Simulate Progress
            </button>
            <button
              className="bg-green-500 text-white p-2 rounded"
              onClick={handleNextStep}
            >
              Next Step
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupOrganization;
