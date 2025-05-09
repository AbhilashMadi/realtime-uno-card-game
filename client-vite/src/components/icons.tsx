import * as React from "react";

import { IconSvgProps } from "@/types";

export const TwitterIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
        fill="currentColor"
      />
    </svg>
  );
};

export const GithubIcon: React.FC<IconSvgProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export const MoonFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    height={size || height}
    viewBox="0 0 24 24"
    width={size || width}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeDasharray={4}
      strokeDashoffset={4}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1}
    >
      <path d="M13 4h1.5M13 4h-1.5M13 4v1.5M13 4v-1.5">
        <animate
          attributeName="stroke-dashoffset"
          begin="0.6s;lineMdSunnyOutlineToMoonAltLoopTransition0.begin+6s"
          dur="0.4s"
          fill="freeze"
          id="lineMdSunnyOutlineToMoonAltLoopTransition0"
          values="4;0"
        />
        <animate
          attributeName="stroke-dashoffset"
          begin="lineMdSunnyOutlineToMoonAltLoopTransition0.begin+2s;lineMdSunnyOutlineToMoonAltLoopTransition0.begin+4s"
          dur="0.4s"
          fill="freeze"
          values="4;0"
        />
        <animate
          attributeName="stroke-dashoffset"
          begin="lineMdSunnyOutlineToMoonAltLoopTransition0.begin+1.2s;lineMdSunnyOutlineToMoonAltLoopTransition0.begin+3.2s;lineMdSunnyOutlineToMoonAltLoopTransition0.begin+5.2s"
          dur="0.4s"
          fill="freeze"
          values="0;4"
        />
        <set
          attributeName="d"
          begin="lineMdSunnyOutlineToMoonAltLoopTransition0.begin+1.8s"
          fill="freeze"
          to="M12 5h1.5M12 5h-1.5M12 5v1.5M12 5v-1.5"
        />
        <set
          attributeName="d"
          begin="lineMdSunnyOutlineToMoonAltLoopTransition0.begin+3.8s"
          fill="freeze"
          to="M12 4h1.5M12 4h-1.5M12 4v1.5M12 4v-1.5"
        />
        <set
          attributeName="d"
          begin="lineMdSunnyOutlineToMoonAltLoopTransition0.begin+5.8s"
          fill="freeze"
          to="M13 4h1.5M13 4h-1.5M13 4v1.5M13 4v-1.5"
        />
      </path>
      <path d="M19 11h1.5M19 11h-1.5M19 11v1.5M19 11v-1.5">
        <animate
          attributeName="stroke-dashoffset"
          begin="1s;lineMdSunnyOutlineToMoonAltLoopTransition1.begin+6s"
          dur="0.4s"
          fill="freeze"
          id="lineMdSunnyOutlineToMoonAltLoopTransition1"
          values="4;0"
        />
        <animate
          attributeName="stroke-dashoffset"
          begin="lineMdSunnyOutlineToMoonAltLoopTransition1.begin+2s;lineMdSunnyOutlineToMoonAltLoopTransition1.begin+4s"
          dur="0.4s"
          fill="freeze"
          values="4;0"
        />
        <animate
          attributeName="stroke-dashoffset"
          begin="lineMdSunnyOutlineToMoonAltLoopTransition1.begin+1.2s;lineMdSunnyOutlineToMoonAltLoopTransition1.begin+3.2s;lineMdSunnyOutlineToMoonAltLoopTransition1.begin+5.2s"
          dur="0.4s"
          fill="freeze"
          values="0;4"
        />
        <set
          attributeName="d"
          begin="lineMdSunnyOutlineToMoonAltLoopTransition1.begin+1.8s"
          fill="freeze"
          to="M17 11h1.5M17 11h-1.5M17 11v1.5M17 11v-1.5"
        />
        <set
          attributeName="d"
          begin="lineMdSunnyOutlineToMoonAltLoopTransition1.begin+3.8s"
          fill="freeze"
          to="M18 12h1.5M18 12h-1.5M18 12v1.5M18 12v-1.5"
        />
        <set
          attributeName="d"
          begin="lineMdSunnyOutlineToMoonAltLoopTransition1.begin+5.8s"
          fill="freeze"
          to="M19 11h1.5M19 11h-1.5M19 11v1.5M19 11v-1.5"
        />
      </path>
      <path d="M19 4h1.5M19 4h-1.5M19 4v1.5M19 4v-1.5">
        <animate
          attributeName="stroke-dashoffset"
          begin="2.8s;lineMdSunnyOutlineToMoonAltLoopTransition2.begin+6s"
          dur="0.4s"
          fill="freeze"
          id="lineMdSunnyOutlineToMoonAltLoopTransition2"
          values="4;0"
        />
        <animate
          attributeName="stroke-dashoffset"
          begin="lineMdSunnyOutlineToMoonAltLoopTransition2.begin+2s"
          dur="0.4s"
          fill="freeze"
          values="4;0"
        />
        <animate
          attributeName="stroke-dashoffset"
          begin="lineMdSunnyOutlineToMoonAltLoopTransition2.begin+1.2s;lineMdSunnyOutlineToMoonAltLoopTransition2.begin+3.2s"
          dur="0.4s"
          fill="freeze"
          values="0;4"
        />
        <set
          attributeName="d"
          begin="lineMdSunnyOutlineToMoonAltLoopTransition2.begin+1.8s"
          fill="freeze"
          to="M20 5h1.5M20 5h-1.5M20 5v1.5M20 5v-1.5"
        />
        <set
          attributeName="d"
          begin="lineMdSunnyOutlineToMoonAltLoopTransition2.begin+5.8s"
          fill="freeze"
          to="M19 4h1.5M19 4h-1.5M19 4v1.5M19 4v-1.5"
        />
      </path>
    </g>
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <g>
        <path
          d="M12 21v1M21 12h1M12 3v-1M3 12h-1"
          strokeDasharray={2}
          strokeDashoffset={4}
        >
          <animate
            attributeName="stroke-dashoffset"
            dur="0.2s"
            fill="freeze"
            values="4;2"
          />
        </path>
        <path
          d="M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5"
          strokeDasharray={2}
          strokeDashoffset={4}
        >
          <animate
            attributeName="stroke-dashoffset"
            begin="0.2s"
            dur="0.2s"
            fill="freeze"
            values="4;2"
          />
        </path>
        <set attributeName="opacity" begin="0.5s" fill="freeze" to={0} />
      </g>
      <path
        d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z"
        opacity={0}
      >
        <set attributeName="opacity" begin="0.5s" fill="freeze" to={1} />
      </path>
    </g>
    <mask id="lineMdSunnyOutlineToMoonAltLoopTransition3">
      <circle cx={12} cy={12} fill="#fff" r={12} />
      <circle cx={12} cy={12} r={4}>
        <animate
          attributeName="r"
          begin="0.1s"
          dur="0.4s"
          fill="freeze"
          values="4;8"
        />
      </circle>
      <circle cx={22} cy={2} fill="#fff" r={3}>
        <animate
          attributeName="cx"
          begin="0.1s"
          dur="0.4s"
          fill="freeze"
          values="22;18"
        />
        <animate
          attributeName="cy"
          begin="0.1s"
          dur="0.4s"
          fill="freeze"
          values="2;6"
        />
        <animate
          attributeName="r"
          begin="0.1s"
          dur="0.4s"
          fill="freeze"
          values="3;12"
        />
      </circle>
      <circle cx={22} cy={2} r={1}>
        <animate
          attributeName="cx"
          begin="0.1s"
          dur="0.4s"
          fill="freeze"
          values="22;18"
        />
        <animate
          attributeName="cy"
          begin="0.1s"
          dur="0.4s"
          fill="freeze"
          values="2;6"
        />
        <animate
          attributeName="r"
          begin="0.1s"
          dur="0.4s"
          fill="freeze"
          values="1;10"
        />
      </circle>
    </mask>
    <circle
      cx={12}
      cy={12}
      fill="currentColor"
      mask="url(#lineMdSunnyOutlineToMoonAltLoopTransition3)"
      r={6}
    >
      <animate
        attributeName="r"
        begin="0.1s"
        dur="0.4s"
        fill="freeze"
        values="6;10"
      />
      <set attributeName="opacity" begin="0.5s" fill="freeze" to={0} />
    </circle>
  </svg>
);

export const SunFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    height={size || height}
    viewBox="0 0 24 24"
    width={size || width}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <path
        d="M12 7c2.76 0 5 2.24 5 5c0 2.76 -2.24 5 -5 5c-2.76 0 -5 -2.24 -5 -5c0 -2.76 2.24 -5 5 -5"
        fill="currentColor"
        fillOpacity={0}
        strokeDasharray={36}
        strokeDashoffset={36}
      >
        <animate
          attributeName="fill-opacity"
          begin="1s"
          dur="0.15s"
          fill="freeze"
          values="0;0.3"
        />
        <animate
          attributeName="stroke-dashoffset"
          dur="0.5s"
          fill="freeze"
          values="36;0"
        />
      </path>
      <path
        d="M12 19v1M19 12h1M12 5v-1M5 12h-1"
        opacity={0}
        strokeDasharray={2}
        strokeDashoffset={2}
      >
        <animate
          attributeName="d"
          begin="0.6s"
          dur="0.2s"
          fill="freeze"
          values="M12 19v1M19 12h1M12 5v-1M5 12h-1;M12 21v1M21 12h1M12 3v-1M3 12h-1"
        />
        <animate
          attributeName="stroke-dashoffset"
          begin="0.6s"
          dur="0.2s"
          fill="freeze"
          values="2;0"
        />
        <set attributeName="opacity" begin="0.6s" fill="freeze" to={1} />
        <animateTransform
          attributeName="transform"
          dur="30s"
          repeatCount="indefinite"
          type="rotate"
          values="0 12 12;360 12 12"
        />
      </path>
      <path
        d="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5"
        opacity={0}
        strokeDasharray={2}
        strokeDashoffset={2}
      >
        <animate
          attributeName="d"
          begin="0.8s"
          dur="0.2s"
          fill="freeze"
          values="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5;M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5"
        />
        <animate
          attributeName="stroke-dashoffset"
          begin="0.8s"
          dur="0.2s"
          fill="freeze"
          values="2;0"
        />
        <set attributeName="opacity" begin="0.8s" fill="freeze" to={1} />
        <animateTransform
          attributeName="transform"
          dur="30s"
          repeatCount="indefinite"
          type="rotate"
          values="0 12 12;360 12 12"
        />
      </path>
    </g>
  </svg>
);

export const HeartFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
      fill="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

export const SearchIcon = (props: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

export const EyeIcon = (props: IconSvgProps & { open: boolean }) => {
  const { open, ...restProps } = props;

  return !open ? (
    <svg
      height={20}
      viewBox="0 0 24 24"
      width={20}
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <g fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path
          d="M3.275 15.296C2.425 14.192 2 13.639 2 12c0-1.64.425-2.191 1.275-3.296C4.972 6.5 7.818 4 12 4s7.028 2.5 8.725 4.704C21.575 9.81 22 10.361 22 12c0 1.64-.425 2.191-1.275 3.296C19.028 17.5 16.182 20 12 20s-7.028-2.5-8.725-4.704Z"
          opacity={0.5}
        />
        <path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z" />
      </g>
    </svg>
  ) : (
    <svg
      height={20}
      viewBox="0 0 24 24"
      width={20}
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        clipRule="evenodd"
        d="M1.606 6.08a1 1 0 0 1 1.313.526L2 7l.92-.394v-.001l.003.009l.021.045l.094.194c.086.172.219.424.4.729a13.4 13.4 0 0 0 1.67 2.237a12 12 0 0 0 .59.592C7.18 11.8 9.251 13 12 13a8.7 8.7 0 0 0 3.22-.602c1.227-.483 2.254-1.21 3.096-1.998a13 13 0 0 0 2.733-3.725l.027-.058l.005-.011a1 1 0 0 1 1.838.788L22 7l.92.394l-.003.005l-.004.008l-.011.026l-.04.087a14 14 0 0 1-.741 1.348a15.4 15.4 0 0 1-1.711 2.256l.797.797a1 1 0 0 1-1.414 1.415l-.84-.84a12 12 0 0 1-1.897 1.256l.782 1.202a1 1 0 1 1-1.676 1.091l-.986-1.514c-.679.208-1.404.355-2.176.424V16.5a1 1 0 0 1-2 0v-1.544c-.775-.07-1.5-.217-2.177-.425l-.985 1.514a1 1 0 0 1-1.676-1.09l.782-1.203c-.7-.37-1.332-.8-1.897-1.257l-.84.84a1 1 0 0 1-1.414-1.414l.797-.797a15.4 15.4 0 0 1-1.87-2.519a14 14 0 0 1-.591-1.107l-.033-.072l-.01-.021l-.002-.007l-.001-.002v-.001C1.08 7.395 1.08 7.394 2 7l-.919.395a1 1 0 0 1 .525-1.314"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export const LogOutIcon = (props: IconSvgProps) => (
  <svg
    height="24"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g fill="currentColor">
      <path d="M6.5 3.75c-.526 0-1.25.63-1.25 1.821V18.43c0 1.192.724 1.821 1.25 1.821h6.996a.75.75 0 1 1 0 1.5H6.5c-1.683 0-2.75-1.673-2.75-3.321V5.57c0-1.648 1.067-3.321 2.75-3.321h7a.75.75 0 0 1 0 1.5z" />
      <path d="M16.53 7.97a.75.75 0 0 0-1.06 0v3.276H9.5a.75.75 0 0 0 0 1.5h5.97v3.284a.75.75 0 0 0 1.06 0l3.5-3.5a.75.75 0 0 0 .22-.532v-.002a.75.75 0 0 0-.269-.575z" />
    </g>
  </svg>
);

export const AddRoomIcon = (props: IconSvgProps) => (
  <svg
    height={24}
    viewBox="0 0 24 24"
    width={24}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13.106 22h-2.212c-3.447 0-5.17 0-6.345-1.012s-1.419-2.705-1.906-6.093l-.279-1.937c-.38-2.637-.57-3.956-.029-5.083s1.691-1.813 3.992-3.183l1.385-.825C9.8 2.622 10.846 2 12 2s2.199.622 4.288 1.867l1.385.825c2.3 1.37 3.451 2.056 3.992 3.183s.35 2.446-.03 5.083l-.278 1.937c-.487 3.388-.731 5.081-1.906 6.093S16.553 22 13.106 22"
      fill="currentColor"
      opacity={0.5}
    />
    <path
      d="M12 9.25a.75.75 0 0 1 .75.75v2.25H15a.75.75 0 0 1 0 1.5h-2.25V16a.75.75 0 0 1-1.5 0v-2.25H9a.75.75 0 0 1 0-1.5h2.25V10a.75.75 0 0 1 .75-.75"
      fill="currentColor"
    />
  </svg>
);

export const GamePodIcon = (props: IconSvgProps) => (
  <svg
    height={24}
    viewBox="0 0 24 24"
    width={24}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4.318 20.536C5.636 22 7.758 22 12 22s6.364 0 7.682-1.465C21 19.072 21 16.714 21 12s0-7.071-1.318-8.536S16.242 2 12 2S5.636 2 4.318 3.464C3 4.93 3 7.286 3 12s0 7.071 1.318 8.535"
      fill="currentColor"
      opacity={0.5}
    />
    <path
      d="M9.25 14a.75.75 0 0 0-1.5 0v.75H7a.75.75 0 0 0 0 1.5h.75V17a.75.75 0 0 0 1.5 0v-.75H10a.75.75 0 0 0 0-1.5h-.75zm7.083-.167a.833.833 0 1 1-1.666 0a.833.833 0 0 1 1.666 0m0 3.334a.833.833 0 1 1-1.666 0a.833.833 0 0 1 1.666 0m-2.5-.834a.833.833 0 1 0 0-1.666a.833.833 0 0 0 0 1.666M18 15.5a.833.833 0 1 1-1.667 0a.833.833 0 0 1 1.667 0M7.051 7.112C7 7.302 7 7.535 7 8s0 .697.051.888a1.5 1.5 0 0 0 1.06 1.06C8.304 10 8.536 10 9 10h6c.465 0 .697 0 .888-.051a1.5 1.5 0 0 0 1.06-1.06C17 8.696 17 8.464 17 8s0-.697-.051-.888a1.5 1.5 0 0 0-1.06-1.06C15.697 6 15.464 6 15 6H9c-.465 0-.697 0-.888.051a1.5 1.5 0 0 0-1.06 1.06"
      fill="currentColor"
    />
  </svg>
);
