import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { uploadCSV } from "../../../../services/operations/taskAPI";

const UploadTask = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      toast.error("Please select a file!");
      return;
    }

    // Allowed file types
    const allowedTypes = ["text/csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type! Only CSV, XLSX, and XLS are allowed.");
      return;
    }

    setSelectedFile(file);
    toast.success("File selected successfully!");
  };

  // Handle form submission
  const onSubmit = async (data) => {
    if (!selectedFile) {
      toast.error("Please upload a valid file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // Send file to backend (replace with your actual API endpoint)
      const response = await uploadCSV(formData)

    } catch (error) {
      console.error("Upload Error:", error);
      toast.error("An error occurred while uploading the file.");
    }
  };

  return (
    <div className="flex  items-center   ">
      <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Upload Task File</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* File Input */}
          <div>
            <label className="block font-semibold">Upload CSV/XLSX/XLS</label>
            <input
              type="file"
              accept=".csv, .xlsx, .xls"
              {...register("file", { required: "File is required" })}
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.file && <p className="text-red-500 text-sm">{errors.file.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Upload File
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadTask;
