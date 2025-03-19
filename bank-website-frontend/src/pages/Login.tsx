import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Copy, QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useAuthStore } from "../store/auth";

export default function Login() {
  const navigate = useNavigate();
  const {
    isAuthenticated,
    isLoading,
    error,
    connectionInvitation,
    createInvitation,
    clearError,
  } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Clear any previous invitations and create a new one
    createInvitation();
    return () => clearError();
  }, []);

  console.log("Connection Invitation:", connectionInvitation);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bank Portal</h1>
          <p className="text-gray-600">
            Connect with your SSI wallet to continue
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Generating connection...</p>
            </div>
          ) : connectionInvitation ? (
            <div className="space-y-4">
              <div className="flex justify-center">
                <QRCodeSVG
                  value={JSON.stringify(connectionInvitation)}
                  size={256}
                  level="H"
                  includeMargin
                />
              </div>

              <div className="text-center">
                <p className="text-gray-600">or copy this invitation</p>
                <textarea
                  readOnly
                  className="w-full h-full p-2 mt-2 border rounded-lg overflow-auto "
                  value={JSON.stringify(
                    connectionInvitation.invitation,
                    null,
                    2
                  )}
                />
                <button
                  onClick={() =>
                    navigator.clipboard
                      .writeText(
                        JSON.stringify(connectionInvitation.invitation, null, 2)
                      )
                      .then(() => {
                        alert("Invitation copied to clipboard!");
                      })
                  }
                  className="mt-2 w-full flex items-center justify-center gap-2 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <Copy className="h-4 w-4" />
                  Copy Invitation
                </button>
              </div>
              <p className="text-sm text-center text-gray-600">
                Scan this QR code with your SSI wallet to connect
              </p>
            </div>
          ) : (
            <button
              onClick={() => createInvitation()}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <QrCode size={20} />
              <span>Generate Connection QR</span>
            </button>
          )}
        </div>

        <div className="mt-8 pt-6 border-t text-center">
          <p className="text-sm text-gray-500">
            Need an SSI wallet? Download our recommended wallet app to get
            started.
          </p>
        </div>
      </div>
    </div>
  );
}
