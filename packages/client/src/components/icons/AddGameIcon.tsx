function AddGameIcon() {
    return (
        <svg
            width="82"
            height="82"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            id="add-game-btn"
        >
            <rect
                className="circle"
                width="82"
                height="82"
                rx="41"
                fill="#3B383B"
            />
            <g className="controller">
                <path
                    className="controller-btn"
                    d="M27.5 49.75H36.5"
                    stroke="#AA5042"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    className="controller-btn"
                    d="M32 45.25V54.25"
                    stroke="#AA5042"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    className="controller-btn"
                    d="M47.75 52H47.7725"
                    stroke="#AA5042"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    className="controller-btn"
                    d="M54.5 47.5H54.5225"
                    stroke="#AA5042"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    className="controller-outline"
                    d="M52.97 36.25H29.03C26.8031 36.2505 24.6555 37.0766 23.0023 38.5685C21.3491 40.0605 20.3078 42.1124 20.0795 44.3275C20.066 44.4445 20.057 44.5547 20.0412 44.6695C19.859 46.186 18.5 57.526 18.5 61C18.5 62.7902 19.2112 64.5071 20.477 65.773C21.7429 67.0388 23.4598 67.75 25.25 67.75C27.5 67.75 28.625 66.625 29.75 65.5L32.9315 62.3185C33.7752 61.4745 34.9196 61.0003 36.113 61H45.887C47.0804 61.0003 48.2248 61.4745 49.0685 62.3185L52.25 65.5C53.375 66.625 54.5 67.75 56.75 67.75C58.5402 67.75 60.2571 67.0388 61.523 65.773C62.7888 64.5071 63.5 62.7902 63.5 61C63.5 57.5238 62.141 46.186 61.9588 44.6695C61.943 44.557 61.934 44.4445 61.9205 44.3297C61.6928 42.1142 60.6516 40.0618 58.9984 38.5694C57.3451 37.077 55.1972 36.2506 52.97 36.25V36.25Z"
                    stroke="#FFFBFA"
                    strokeOpacity="0.9"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
            <g className="plus">
                <path
                    d="M67 3V24"
                    stroke="#FFFBFA"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M57 13H77"
                    stroke="#FFFBFA"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </svg>
    )
}

export default AddGameIcon
