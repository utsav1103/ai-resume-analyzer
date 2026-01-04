import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const WipeApp = () => {
  const { auth, isLoading, error, fs, kv } = usePuterStore();
  const navigate = useNavigate();
  const [files, setFiles] = useState<FSItem[]>([]);

  const loadFiles = async () => {
    const files = (await fs.readDir("./")) as FSItem[];
    setFiles(files);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/wipe");
    }
  }, [isLoading]);

  const handleDelete = async () => {
    if (!confirm("⚠️ This will permanently delete all app data. Continue?")) {
      return;
    }

    for (const file of files) {
      await fs.delete(file.path);
    }

    await kv.flush();
    loadFiles();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">
            Wipe App Data
          </h1>
          <p className="text-sm text-gray-600">
            Logged in as{" "}
            <span className="font-semibold">{auth.user?.username}</span>
          </p>
        </div>

        {/* Warning box */}
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-700">
            ⚠️ This action will permanently delete all uploaded resumes,
            generated data, and stored AI results. This cannot be undone.
          </p>
        </div>

        {/* File list */}
        <div className="space-y-2">
          <h2 className="font-semibold text-gray-800">
            Existing files ({files.length})
          </h2>

          {files.length === 0 ? (
            <p className="text-sm text-gray-500 italic">
              No files found.
            </p>
          ) : (
            <div className="max-h-60 overflow-y-auto rounded-lg border">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between px-4 py-2 text-sm border-b last:border-b-0"
                >
                  <span className="truncate">{file.name}</span>
                  <span className="text-gray-400 text-xs">
                    {file.is_dir?"Folder" : "File"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action */}
        <div className="flex justify-end">
          <button
            onClick={handleDelete}
            className="rounded-xl bg-red-600 px-6 py-3 text-white font-semibold
                       hover:bg-red-700 active:scale-95 transition-all
                       shadow-md"
          >
            Wipe All App Data
          </button>
        </div>
      </div>
    </main>
  );
};

export default WipeApp;
