import { useState, useRef, ChangeEvent } from "react";
// import { useScreenshot, createFileName } from "use-react-screenshot";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import FormInput from "./components/forms/FormInput";
import FormCheckbox from "./components/forms/FormCheckbox";
import MDEditor from "@uiw/react-md-editor";
import { generateName } from "./helpers";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const currentTheme = document.documentElement.getAttribute("data-color-mode");
  if (currentTheme != "dark") {
    document.documentElement.setAttribute("data-color-mode", "light");
  }

  const toggleTheme = () => {
    const switchTo = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-color-mode", switchTo);
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const [user, setUser] = useState({
    name: "Anbuselvan Rocky",
    username: "anburocky3",
    role: "Founder / CEO",
    verified: true,
    platforms: "linkedin",
    description: "I am a full stack developer and a tech enthusiast.",
    imageBorder: false,
  });

  const ref = useRef(null);

  const downloadScreenshot = () => {
    if (file === null) {
      alert("Please upload an image and proceed!");
      return;
    }
    if (ref.current === null) return;

    htmlToImage.toJpeg(ref.current).then(function (dataUrl) {
      download(dataUrl, generateName(user.name));
    });
  };

  const [file, setFile] = useState<File | null>(null);

  const handleImagePicked = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    const data = e.target.files[0];
    setFile(data);
  };

  const handleInputFields = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (
      e.target.type === "checkbox" &&
      !(e.target instanceof HTMLTextAreaElement)
    ) {
      setUser({ ...user, [e.target.name]: e.target.checked });
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="bg-gray-200 dark:bg-zinc-900 min-h-screen">
      <div className="bg-indigo-500 text-white text-center p-5 relative">
        <h1 className="text-xl sm:text-3xl font-bold flex items-center justify-center">
          <span>Post Branding |</span>
          <a
            href="https://fb.com/anburocky3"
            target="_blank"
            className="font-medium text-sm mt-1 sm:mt-2 ml-1"
          >
            (@anbuselvanrocky)
          </a>
        </h1>
        <div className="absolute right-5 top-6">
          <a
            href="https://github.com/anburocky3/post-mockup-app/fork"
            target="_blank"
            className="px-4 py-1 bg-gray-800 hover:bg-gray-900 rounded hidden sm:block"
            title="Fork on Github"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="inline-block mr-2 fill-current text-rose-500"
            >
              <g strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                <path d="M16 22.027v-2.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7a5.44 5.44 0 0 0-1.5-3.75a5.07 5.07 0 0 0-.09-3.77s-1.18-.35-3.91 1.48a13.38 13.38 0 0 0-7 0c-2.73-1.83-3.91-1.48-3.91-1.48A5.07 5.07 0 0 0 5 5.797a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 0 0-.94 2.58v2.87"></path>
                <path d="M9 20.027c-3 .973-5.5 0-7-3"></path>
              </g>
            </svg>
            <span>Github</span>
          </a>
        </div>
      </div>
      <div className="container mx-auto p-5 sm:p-10 flex flex-col sm:flex-row gap-10">
        <div className="w-full sm:w-1/3 bg-white dark:bg-gray-800 p-10 rounded border dark:border-gray-900 shadow  flex-1">
          <form action="">
            <div className="mb-3">
              <FormInput
                name="name"
                label="Full Name"
                placeholder="Full name"
                value={user.name}
                onChange={handleInputFields}
              />
            </div>
            {/* <div className="mb-3">
              <FormInput
                name="username"
                label="Username"
                placeholder="Username"
                value={user.username}
                onChange={handleInputFields}
              />
            </div> */}
            <div className="mb-3">
              <FormInput
                name="role"
                label="Designation"
                placeholder="Your Designation"
                value={user.role}
                onChange={handleInputFields}
              />
            </div>
            <div className="mb-3">
              <FormCheckbox
                name="verified"
                label="Profile verified?"
                checked={user.verified}
                onChange={handleInputFields}
              />
            </div>
            <div className="mb-3">
              {/* <FormTextArea
                name="description"
                label="Post Description"
                placeholder="Enter your post description here"
                value={user.description}
                onChange={handleInputFields}
              /> */}
              <MDEditor
                value={user.description}
                preview="edit"
                height="100%"
                visibleDragbar={false}
                onChange={(value) =>
                  setUser({ ...user, description: value || "" })
                }
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="image"
                className="block mb-1 text-gray-500 dark:text-white"
              >
                Profile Image
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="image"
                id="image"
                type="file"
                onChange={handleImagePicked}
                accept="image/*"
              />
              <small
                className="mt-1 text-xs text-gray-500 dark:text-gray-500"
                id="image"
              >
                SVG, PNG, JPG or GIF (MAX. 800x400px).
              </small>
            </div>
            <div className="mb-3">
              <FormCheckbox
                name="imageBorder"
                label="Add Border to image?"
                checked={user.imageBorder}
                onChange={handleInputFields}
              />
            </div>
            <button
              type="reset"
              className="px-4 py-2 w-full rounded bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => alert("We are working on it!")}
            >
              Reset
            </button>
          </form>
        </div>
        <div className="sm:w-2/3 w-full">
          <div className="space-x-4 text-right">
            <button
              className="px-4 py-1 rounded bg-gray-800 dark:bg-pink-600 dark:hover:bg-pink-700 hover:bg-gray-900 text-white mb-5"
              onClick={toggleTheme}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className="text-white fill-current inline-block mr-2 -mt-1"
              >
                <path d="M12 21q-3.75 0-6.375-2.625T3 12q0-3.75 2.625-6.375T12 3q.35 0 .688.025t.662.075q-1.025.725-1.638 1.888T11.1 7.5q0 2.25 1.575 3.825T16.5 12.9q1.375 0 2.525-.613T20.9 10.65q.05.325.075.662T21 12q0 3.75-2.625 6.375T12 21m0-2q2.2 0 3.95-1.213t2.55-3.162q-.5.125-1 .2t-1 .075q-3.075 0-5.238-2.163T9.1 7.5q0-.5.075-1t.2-1q-1.95.8-3.163 2.55T5 12q0 2.9 2.05 4.95T12 19m-.25-6.75"></path>
              </svg>
              <span>Switch to {darkMode ? "Light" : "Dark"} Theme</span>
            </button>

            <button
              className="px-4 py-1 rounded bg-purple-500 hover:bg-purple-600 text-white mb-5"
              onClick={downloadScreenshot}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                className="text-white fill-current inline-block mr-2"
              >
                <path d="M18 7H6V3h12zm0 5.5q.425 0 .713-.288T19 11.5q0-.425-.288-.712T18 10.5q-.425 0-.712.288T17 11.5q0 .425.288.713T18 12.5M16 19v-4H8v4zm2 2H6v-4H2v-6q0-1.275.875-2.137T5 8h14q1.275 0 2.138.863T22 11v6h-4z"></path>
              </svg>
              <span>Download</span>
            </button>
          </div>

          <div
            className="bg-gray-50 dark:bg-gray-800 p-5 sm:p-10 rounded"
            ref={ref}
          >
            <div className="bg-white dark:bg-gray-900 p-5 sm:p-10 border dark:border-none rounded shadow">
              <div className="flex items-start space-x-4">
                {file ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={user.name}
                    className={`rounded-full w-14 h-14 sm:w-20 sm:h-20 object-cover ${
                      user.imageBorder
                        ? "border sm:border-2  bg-gradient-to-b from-blue-500 to-pink-500 p-1"
                        : ""
                    }`}
                  />
                ) : (
                  <img
                    src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                    alt={user.name}
                    className={`rounded-full w-14 h-14 sm:w-20 sm:h-20 object-cover  ${
                      user.imageBorder
                        ? "border sm:border-2 bg-gradient-to-b from-blue-500 to-pink-500 p-1"
                        : ""
                    }`}
                  />
                )}

                <div className="mt-2">
                  <p className="text-lg sm:text-2xl font-bold dark:text-white">
                    {user.name}
                    {user.verified && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 16 16"
                        className="text-blue-500 inline-block fill-current ml-2"
                      >
                        <path
                          fillRule="evenodd"
                          d="M15.67 7.066l-1.08-1.34a1.5 1.5 0 0 1-.309-.77l-.19-1.698a1.51 1.51 0 0 0-1.329-1.33l-1.699-.19c-.3-.03-.56-.159-.78-.329L8.945.33a1.504 1.504 0 0 0-1.878 0l-1.34 1.08a1.5 1.5 0 0 1-.77.31l-1.698.19c-.7.08-1.25.63-1.33 1.329l-.19 1.699c-.03.3-.159.56-.329.78L.33 7.055a1.504 1.504 0 0 0 0 1.878l1.08 1.34c.17.22.28.48.31.77l.19 1.698c.08.7.63 1.25 1.329 1.33l1.699.19c.3.03.56.159.78.329l1.339 1.08c.55.439 1.329.439 1.878 0l1.34-1.08c.22-.17.48-.28.77-.31l1.698-.19c.7-.08 1.25-.63 1.33-1.329l.19-1.699c.03-.3.159-.56.329-.78l1.08-1.339a1.504 1.504 0 0 0 0-1.878zM6.5 12.01L3 8.51l1.5-1.5l2 2l5-5L13 5.56l-6.5 6.45z"
                        />
                      </svg>
                    )}
                  </p>
                  <small className="text-base sm:text-xl font-light dark:text-white">
                    {user.role}
                  </small>
                </div>
              </div>
              <div className="p-3">
                {/* <p className="p-3 justify-stretch">{user.description}</p> */}
                <MDEditor.Markdown
                  source={user.description}
                  className={"" + "dark:bg-gray-900"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
