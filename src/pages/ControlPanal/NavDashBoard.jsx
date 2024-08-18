import React, { useState } from "react";

import { HiMenuAlt3 } from "react-icons/hi";
import { LuSearch } from "react-icons/lu";
import Avatar from "@/assets/images/Avatar.png";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function NavDashBoard({ head }) {
  const [expend, setexpend] = useState(false);

  return (
    <div className="shadow-sm d-flex justify-content-between  gap-2 p-3">
      <div className=" d-flex align-items-center  gap-2 w-75">
        <HiMenuAlt3
          className="color_pink fs-2 button_toggle "
          onClick={() => setexpend(!expend)}
        />
        <span className=" header_name fw-bold primary pe-4">
          {head ? head : "مرحبًا بك في SpaceChat"}
        </span>
      </div>
      <div className="d-flex justify-content-end align-items-center  gap-2 w-50">
        <LuSearch
          className="fs-4 primary d-lg-block d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        />

        <div className="dropdown en">
          <button
            className="btn dropdown-toggle font_en border-0 "
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <LazyLoadImage
              alt={"hi"}
              effect="blur"
              src={Avatar}
              opacity="true"
              placeholderSrc={Avatar}
              className="me-2 "
            />
            Mostafa M.
          </button>
          <ul
            className="dropdown-menu font_en"
            aria-labelledby="dropdownMenuButton1"
          >
            <li>
              <a className="dropdown-item" href="#/">
                Action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#/">
                Another action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#/">
                Something else here
              </a>
            </li>
            <li>
              <span className="dropdown-item" href="#/">
                <LuSearch
                  className="fs-4 primary d-lg-none d-block"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
