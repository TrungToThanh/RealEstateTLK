// NotFoundPage.js

import { Result, Button } from "antd";
import { Link } from "react-router-dom"; // If using React Router

export const NotFoundPage = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" className="rounded">
            <Link to="/" className="text-white">
              Back Home
            </Link>{" "}
            {/* Replace with your home route */}
          </Button>
        }
        className="max-w-sm w-full p-6 bg-white rounded-lg shadow-md"
      />
    </div>
  );
};
