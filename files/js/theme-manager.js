window.ThemeManager = {
    themes: {
        midnight: {
            name: "Midnight",
            timeRange: { start: 0, end: 2 },
            variables: {
                "bg-color": "#0A0A14",
                "bg-color-alt": "#12121E",
                "bg-color-rgb": "10, 10, 20",
                "primary-color": "#7214FF", 
                "primary-color-rgb": "114, 20, 255",
                "secondary-color": "#3A10E5", 
                "secondary-color-rgb": "58, 16, 229",
                "accent-color": "#131335",
                "accent-color-alt": "#7B42FF", 
                "accent-color-alt-rgb": "123, 66, 255",
                "text-color": "#C2C2E0", 
                "text-color-headings": "#FFFFFF",
                "text-color-light": "#8585AD",
                "text-color-darker": "#4C4C6E",
                "neon-blue": "#0D7FE3",
                "neon-green": "#00FF94",
                "neon-orange": "#FF5100",
                "neon-pink": "#FF007F",
                "neon-purple": "#9D00FF",
                "glass-bg": "rgba(18, 18, 30, 0.85)",
                "glass-effect": "saturate(180%) blur(1.2vh)",
                "card-bg": "rgba(20, 20, 35, 0.9)",
                "card-border": "rgba(114, 20, 255, 0.3)",
                "card-shadow":
                    "0 .8vh 2vh rgba(114, 20, 255, 0.15), 0 0 .5vh rgba(114, 20, 255, 0.3)",
                "gradient-bg":
                    "linear-gradient(180deg, #12121E 0%, #0A0A14 100%)",
                "gradient-primary": "linear-gradient(135deg, #7214FF, #3A10E5)",
                "cosmic-glow-color1": "#7214FF",
                "cosmic-glow-color2": "#3A10E5",
            },
            extraStyles: `
                body::before {
                    content: "";
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-image: 
                        radial-gradient(circle at 10% 20%, rgba(114, 20, 255, 0.03) 0%, transparent 25%),
                        radial-gradient(circle at 90% 80%, rgba(58, 16, 229, 0.03) 0%, transparent 25%);
                    z-index: -1;
                    pointer-events: none;
                }
                .section-title::after {
                    background: linear-gradient(90deg, #7214FF, #3A10E5);
                }
            `,
        },
        earlyMorning: {
            name: "Early Morning",
            timeRange: { start: 3, end: 5 },
            variables: {
                "bg-color": "#0F1A2F",
                "bg-color-alt": "#172A45",
                "bg-color-rgb": "15, 26, 47",
                "primary-color": "#5065DA", 
                "primary-color-rgb": "80, 101, 218",
                "secondary-color": "#3F88C5", 
                "secondary-color-rgb": "63, 136, 197",
                "accent-color": "#1D2F50",
                "accent-color-alt": "#D47FB8", 
                "accent-color-alt-rgb": "212, 127, 184",
                "text-color": "#C4D4E3", 
                "text-color-headings": "#FFFFFF",
                "text-color-light": "#8DA9C4",
                "text-color-darker": "#5D7599",
                "neon-blue": "#4895EF",
                "neon-green": "#4CC9BE",
                "neon-orange": "#F77F5A",
                "neon-pink": "#DE3D83",
                "neon-purple": "#7251B5",
                "glass-bg": "rgba(23, 42, 69, 0.8)",
                "glass-effect": "saturate(160%) blur(1vh)",
                "card-bg": "rgba(29, 47, 80, 0.85)",
                "card-border": "rgba(80, 101, 218, 0.25)",
                "card-shadow":
                    "0 .7vh 1.8vh rgba(63, 136, 197, 0.15), 0 0 .5vh rgba(80, 101, 218, 0.2)",
                "gradient-bg":
                    "linear-gradient(180deg, #172A45 0%, #0F1A2F 100%)",
                "gradient-primary": "linear-gradient(135deg, #5065DA, #3F88C5)",
                "cosmic-glow-color1": "#5065DA",
                "cosmic-glow-color2": "#3F88C5",
            },
            extraStyles: `
                body::before {
                    content: "";
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-image: 
                        radial-gradient(circle at 90% 0%, rgba(212, 127, 184, 0.04) 0%, transparent 35%),
                        radial-gradient(circle at 10% 90%, rgba(63, 136, 197, 0.03) 0%, transparent 30%);
                    z-index: -1;
                    pointer-events: none;
                }
                .section-title::after {
                    background: linear-gradient(90deg, #5065DA, #3F88C5);
                }
            `,
        },
        dawn: {
            name: "Dawn",
            timeRange: { start: 6, end: 7 },
            variables: {
                "bg-color": "#1F2247",
                "bg-color-alt": "#2A2C57",
                "bg-color-rgb": "31, 34, 71",
                "primary-color": "#FF9E7A", 
                "primary-color-rgb": "255, 158, 122",
                "secondary-color": "#E37A90", 
                "secondary-color-rgb": "227, 122, 144",
                "accent-color": "#2D3163",
                "accent-color-alt": "#FFD56A", 
                "accent-color-alt-rgb": "255, 213, 106",
                "text-color": "#D6D7F3", 
                "text-color-headings": "#FFE8D6",
                "text-color-light": "#AAB0E6",
                "text-color-darker": "#7175A3",
                "neon-blue": "#69A1F0",
                "neon-green": "#7EDFA7",
                "neon-orange": "#FFAB70",
                "neon-pink": "#FF7E9D",
                "neon-purple": "#BD8AFF",
                "glass-bg": "rgba(42, 44, 87, 0.75)",
                "glass-effect": "saturate(140%) blur(1vh)",
                "card-bg": "rgba(45, 49, 99, 0.8)",
                "card-border": "rgba(255, 158, 122, 0.3)",
                "card-shadow":
                    "0 .7vh 1.8vh rgba(227, 122, 144, 0.15), 0 0 .5vh rgba(255, 158, 122, 0.25)",
                "gradient-bg":
                    "linear-gradient(180deg, #2A2C57 0%, #1F2247 100%)",
                "gradient-primary": "linear-gradient(135deg, #FF9E7A, #E37A90)",
                "cosmic-glow-color1": "#FF9E7A",
                "cosmic-glow-color2": "#E37A90",
            },
            extraStyles: `
                body::before {
                    content: "";
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-image: 
                        radial-gradient(circle at 90% 20%, rgba(255, 158, 122, 0.06) 0%, transparent 40%),
                        radial-gradient(circle at 10% 80%, rgba(227, 122, 144, 0.06) 0%, transparent 40%);
                    z-index: -1;
                    pointer-events: none;
                }
                .section-title::after {
                    background: linear-gradient(90deg, #FF9E7A, #E37A90);
                }
            `,
        },
        morning: {
            name: "Morning",
            timeRange: { start: 8, end: 9 },
            variables: {
                "bg-color": "#EFF5FB",
                "bg-color-alt": "#FFFFFF",
                "bg-color-rgb": "239, 245, 251",
                "primary-color": "#3498DB", 
                "primary-color-rgb": "52, 152, 219",
                "secondary-color": "#26C6DA", 
                "secondary-color-rgb": "38, 198, 218",
                "accent-color": "#F0F8FF",
                "accent-color-alt": "#F1C40F", 
                "accent-color-alt-rgb": "241, 196, 15",
                "text-color": "#2C3E50",
                "text-color-headings": "#1A365D",
                "text-color-light": "#718096",
                "text-color-darker": "#4A5568",
                "neon-blue": "#0078FF",
                "neon-green": "#2ECC71",
                "neon-orange": "#F39C12",
                "neon-pink": "#E91E63",
                "neon-purple": "#9B59B6",
                "glass-bg": "rgba(255, 255, 255, 0.7)",
                "glass-effect": "saturate(100%) blur(.8vh)",
                "card-bg": "#FFFFFF",
                "card-border": "rgba(52, 152, 219, 0.2)",
                "card-shadow":
                    "0 .5vh 1.5vh rgba(0, 0, 0, 0.06), 0 0 .3vh rgba(52, 152, 219, 0.1)",
                "gradient-bg":
                    "linear-gradient(180deg, #FFFFFF 0%, #EFF5FB 100%)",
                "gradient-primary": "linear-gradient(135deg, #3498DB, #26C6DA)",
                "cosmic-glow-color1": "#3498DB",
                "cosmic-glow-color2": "#26C6DA",
            },
            extraStyles: `
                body::before {
                    content: "";
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-image: 
                        radial-gradient(circle at 90% 10%, rgba(241, 196, 15, 0.05) 0%, transparent 35%),
                        radial-gradient(circle at 10% 90%, rgba(52, 152, 219, 0.03) 0%, transparent 30%);
                    z-index: -1;
                    pointer-events: none;
                }
                .section-title::after {
                    background: linear-gradient(90deg, #3498DB, #26C6DA);
                }
            `,
        },
        lateMorning: {
            name: "Late Morning",
            timeRange: { start: 10, end: 11 },
            variables: {
                "bg-color": "#F2F9FF",
                "bg-color-alt": "#FFFFFF",
                "bg-color-rgb": "242, 249, 255",
                "primary-color": "#00B4D8", 
                "primary-color-rgb": "0, 180, 216",
                "secondary-color": "#38E54D", 
                "secondary-color-rgb": "56, 229, 77",
                "accent-color": "#F7FBFF",
                "accent-color-alt": "#FF9F1C", 
                "accent-color-alt-rgb": "255, 159, 28",
                "text-color": "#1E293B",
                "text-color-headings": "#0F172A",
                "text-color-light": "#64748B",
                "text-color-darker": "#334155",
                "neon-blue": "#0096FF",
                "neon-green": "#10B981",
                "neon-orange": "#FB923C",
                "neon-pink": "#F472B6",
                "neon-purple": "#A855F7",
                "glass-bg": "rgba(255, 255, 255, 0.65)",
                "glass-effect": "saturate(110%) blur(.7vh)",
                "card-bg": "#FFFFFF",
                "card-border": "rgba(0, 180, 216, 0.15)",
                "card-shadow":
                    "0 .5vh 1.2vh rgba(0, 0, 0, 0.05), 0 0 .3vh rgba(0, 180, 216, 0.08)",
                "gradient-bg":
                    "linear-gradient(180deg, #FFFFFF 0%, #F2F9FF 100%)",
                "gradient-primary": "linear-gradient(135deg, #00B4D8, #38E54D)",
                "cosmic-glow-color1": "#00B4D8",
                "cosmic-glow-color2": "#38E54D",
            },
            extraStyles: `
                body::before {
                    content: "";
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-image: 
                        radial-gradient(circle at 85% 15%, rgba(255, 159, 28, 0.04) 0%, transparent 30%),
                        radial-gradient(circle at 15% 85%, rgba(0, 180, 216, 0.04) 0%, transparent 30%);
                    z-index: -1;
                    pointer-events: none;
                }
                .section-title::after {
                    background: linear-gradient(90deg, #00B4D8, #38E54D);
                }
            `,
        },
        noon: {
            name: "Noon",
            timeRange: { start: 12, end: 13 },
            variables: {
                "bg-color": "#F9FAFB",
                "bg-color-alt": "#FFFFFF",
                "bg-color-rgb": "249, 250, 251",
                "primary-color": "#0EA5E9", 
                "primary-color-rgb": "14, 165, 233",
                "secondary-color": "#F59E0B", 
                "secondary-color-rgb": "245, 158, 11",
                "accent-color": "#F8FAFC",
                "accent-color-alt": "#FBBF24", 
                "accent-color-alt-rgb": "251, 191, 36",
                "text-color": "#0F172A",
                "text-color-headings": "#111827",
                "text-color-light": "#64748B",
                "text-color-darker": "#1E293B",
                "neon-blue": "#38BDF8",
                "neon-green": "#22C55E",
                "neon-orange": "#F97316",
                "neon-pink": "#EC4899",
                "neon-purple": "#8B5CF6",
                "glass-bg": "rgba(255, 255, 255, 0.65)",
                "glass-effect": "saturate(105%) blur(.7vh)",
                "card-bg": "#FFFFFF",
                "card-border": "rgba(14, 165, 233, 0.15)",
                "card-shadow":
                    "0 .5vh 1.2vh rgba(0, 0, 0, 0.04), 0 0 .3vh rgba(14, 165, 233, 0.07)",
                "gradient-bg":
                    "linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%)",
                "gradient-primary": "linear-gradient(135deg, #0EA5E9, #F59E0B)",
                "cosmic-glow-color1": "#0EA5E9",
                "cosmic-glow-color2": "#F59E0B",
            },
            extraStyles: `
                body::before {
                    content: "";
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-image: 
                        radial-gradient(circle at top center, rgba(251, 191, 36, 0.03) 0%, transparent 40%),
                        radial-gradient(circle at bottom center, rgba(14, 165, 233, 0.02) 0%, transparent 30%);
                    z-index: -1;
                    pointer-events: none;
                }
                .section-title::after {
                    background: linear-gradient(90deg, #0EA5E9, #F59E0B);
                }
            `,
        },
        afternoon: {
            name: "Afternoon",
            timeRange: { start: 14, end: 15 },
            variables: {
                "bg-color": "#F5F7FA",
                "bg-color-alt": "#FFFFFF",
                "bg-color-rgb": "245, 247, 250",
                "primary-color": "#DD6B20", 
                "primary-color-rgb": "221, 107, 32",
                "secondary-color": "#F6AD55", 
                "secondary-color-rgb": "246, 173, 85",
                "accent-color": "#F9FAFB",
                "accent-color-alt": "#ED8936", 
                "accent-color-alt-rgb": "237, 137, 54",
                "text-color": "#1A202C",
                "text-color-headings": "#2D3748",
                "text-color-light": "#718096",
                "text-color-darker": "#4A5568",
                "neon-blue": "#4299E1",
                "neon-green": "#48BB78",
                "neon-orange": "#ED8936",
                "neon-pink": "#ED64A6",
                "neon-purple": "#9F7AEA",
                "glass-bg": "rgba(255, 255, 255, 0.65)",
                "glass-effect": "saturate(105%) blur(.7vh)",
                "card-bg": "#FFFFFF",
                "card-border": "rgba(221, 107, 32, 0.15)",
                "card-shadow":
                    "0 .5vh 1.2vh rgba(221, 107, 32, 0.05), 0 0 .3vh rgba(221, 107, 32, 0.08)",
                "gradient-bg":
                    "linear-gradient(180deg, #FFFFFF 0%, #F5F7FA 100%)",
                "gradient-primary": "linear-gradient(135deg, #DD6B20, #F6AD55)",
                "cosmic-glow-color1": "#DD6B20",
                "cosmic-glow-color2": "#F6AD55",
            },
            extraStyles: `
                body::before {
                    content: "";
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-image: 
                        radial-gradient(circle at 80% 20%, rgba(237, 137, 54, 0.04) 0%, transparent 40%),
                        radial-gradient(circle at 20% 80%, rgba(221, 107, 32, 0.03) 0%, transparent 40%);
                    z-index: -1;
                    pointer-events: none;
                }
                .section-title::after {
                    background: linear-gradient(90deg, #DD6B20, #F6AD55);
                }
            `,
        },
        lateAfternoon: {
            name: "Late Afternoon",
            timeRange: { start: 16, end: 17 },
            variables: {
                "bg-color": "#FCF5F0",
                "bg-color-alt": "#FFFFFF",
                "bg-color-rgb": "252, 245, 240",
                "primary-color": "#D6806A", 
                "primary-color-rgb": "214, 128, 106",
                "secondary-color": "#E9B872", 
                "secondary-color-rgb": "233, 184, 114",
                "accent-color": "#FDF8F5",
                "accent-color-alt": "#FE9255", 
                "accent-color-alt-rgb": "254, 146, 85",
                "text-color": "#43302B",
                "text-color-headings": "#2E1F1B",
                "text-color-light": "#8D7A74",
                "text-color-darker": "#5E4C45",
                "neon-blue": "#53A2F0",
                "neon-green": "#84D19E",
                "neon-orange": "#FF9D66",
                "neon-pink": "#FF7994",
                "neon-purple": "#C185FF",
                "glass-bg": "rgba(255, 255, 255, 0.6)",
                "glass-effect": "saturate(120%) blur(.7vh)",
                "card-bg": "#FFFFFF",
                "card-border": "rgba(214, 128, 106, 0.18)",
                "card-shadow":
                    "0 .5vh 1.5vh rgba(233, 184, 114, 0.1), 0 0 .3vh rgba(214, 128, 106, 0.1)",
                "gradient-bg":
                    "linear-gradient(180deg, #FFFFFF 0%, #FCF5F0 100%)",
                "gradient-primary": "linear-gradient(135deg, #D6806A, #E9B872)",
                "cosmic-glow-color1": "#D6806A",
                "cosmic-glow-color2": "#E9B872",
            },
            extraStyles: `
                body::before {
                    content: "";
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-image: 
                        radial-gradient(circle at 80% 30%, rgba(254, 146, 85, 0.05) 0%, transparent 40%),
                        radial-gradient(circle at 20% 70%, rgba(233, 184, 114, 0.04) 0%, transparent 40%);
                    z-index: -1;
                    pointer-events: none;
                }
                .section-title::after {
                    background: linear-gradient(90deg, #D6806A, #E9B872);
                }
            `,
        },
        evening: {
            name: "Evening",
            timeRange: { start: 18, end: 19 },
            variables: {
                "bg-color": "#463449",
                "bg-color-alt": "#5A445F",
                "bg-color-rgb": "70, 52, 73",
                "primary-color": "#FF7B54", 
                "primary-color-rgb": "255, 123, 84",
                "secondary-color": "#A460ED", 
                "secondary-color-rgb": "164, 96, 237",
                "accent-color": "#382B3A",
                "accent-color-alt": "#FFB26B", 
                "accent-color-alt-rgb": "255, 178, 107",
                "text-color": "#E3D8E9",
                "text-color-headings": "#FFE2D4",
                "text-color-light": "#BCA9C9",
                "text-color-darker": "#7D6985",
                "neon-blue": "#7FA6FF",
                "neon-green": "#90E792",
                "neon-orange": "#FF8C66",
                "neon-pink": "#FF6999",
                "neon-purple": "#C67AFF",
                "glass-bg": "rgba(90, 68, 95, 0.75)",
                "glass-effect": "saturate(150%) blur(1vh)",
                "card-bg": "rgba(56, 43, 58, 0.85)",
                "card-border": "rgba(255, 123, 84, 0.25)",
                "card-shadow":
                    "0 .6vh 1.8vh rgba(164, 96, 237, 0.15), 0 0 .5vh rgba(255, 123, 84, 0.2)",
                "gradient-bg":
                    "linear-gradient(180deg, #5A445F 0%, #463449 100%)",
                "gradient-primary": "linear-gradient(135deg, #FF7B54, #A460ED)",
                "cosmic-glow-color1": "#FF7B54",
                "cosmic-glow-color2": "#A460ED",
            },
            extraStyles: `
                body::before {
                    content: "";
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-image: 
                        radial-gradient(circle at 80% 20%, rgba(255, 123, 84, 0.07) 0%, transparent 40%),
                        radial-gradient(circle at 20% 80%, rgba(164, 96, 237, 0.05) 0%, transparent 40%);
                    z-index: -1;
                    pointer-events: none;
                }
                .section-title::after {
                    background: linear-gradient(90deg, #FF7B54, #A460ED);
                }
            `,
        },
        dusk: {
            name: "Dusk",
            timeRange: { start: 20, end: 20 },
            variables: {
                "bg-color": "#282D4F",
                "bg-color-alt": "#313862",
                "bg-color-rgb": "40, 45, 79",
                "primary-color": "#FF5277", 
                "primary-color-rgb": "255, 82, 119",
                "secondary-color": "#6C63FF", 
                "secondary-color-rgb": "108, 99, 255",
                "accent-color": "#2C3154",
                "accent-color-alt": "#FFD369", 
                "accent-color-alt-rgb": "255, 211, 105",
                "text-color": "#D5D9F0",
                "text-color-headings": "#FFFFFF",
                "text-color-light": "#A2ABDB",
                "text-color-darker": "#636EA6",
                "neon-blue": "#5671FF",
                "neon-green": "#65EDC5",
                "neon-orange": "#FF7D6E",
                "neon-pink": "#FF5FA2",
                "neon-purple": "#A278FF",
                "glass-bg": "rgba(49, 56, 98, 0.75)",
                "glass-effect": "saturate(160%) blur(1vh)",
                "card-bg": "rgba(44, 49, 84, 0.85)",
                "card-border": "rgba(255, 82, 119, 0.25)",
                "card-shadow":
                    "0 .6vh 1.8vh rgba(108, 99, 255, 0.15), 0 0 .5vh rgba(255, 82, 119, 0.2)",
                "gradient-bg":
                    "linear-gradient(180deg, #313862 0%, #282D4F 100%)",
                "gradient-primary": "linear-gradient(135deg, #FF5277, #6C63FF)",
                "cosmic-glow-color1": "#FF5277",
                "cosmic-glow-color2": "#6C63FF",
            },
            extraStyles: `
                body::before {
                    content: "";
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-image: 
                        radial-gradient(circle at 75% 25%, rgba(255, 82, 119, 0.05) 0%, transparent 35%),
                        radial-gradient(circle at 25% 75%, rgba(108, 99, 255, 0.04) 0%, transparent 35%);
                    z-index: -1;
                    pointer-events: none;
                }
                .section-title::after {
                    background: linear-gradient(90deg, #FF5277, #6C63FF);
                }
            `,
        },
        night: {
            name: "Night",
            timeRange: { start: 21, end: 22 },
            variables: {
                "bg-color": "#0F1A2A",
                "bg-color-alt": "#162A45",
                "bg-color-rgb": "15, 26, 42",
                "primary-color": "#36B5D0", 
                "primary-color-rgb": "54, 181, 208",
                "secondary-color": "#9C54FF", 
                "secondary-color-rgb": "156, 84, 255",
                "accent-color": "#1E2B3D",
                "accent-color-alt": "#FFDA85", 
                "accent-color-alt-rgb": "255, 218, 133",
                "text-color": "#C9D4DD",
                "text-color-headings": "#F0F7FF",
                "text-color-light": "#8DA1B5",
                "text-color-darker": "#506477",
                "neon-blue": "#00B2FF",
                "neon-green": "#00FF94",
                "neon-orange": "#FF8956",
                "neon-pink": "#FF4A93",
                "neon-purple": "#AE60FF",
                "glass-bg": "rgba(22, 42, 69, 0.8)",
                "glass-effect": "saturate(170%) blur(1vh)",
                "card-bg": "rgba(30, 43, 61, 0.85)",
                "card-border": "rgba(54, 181, 208, 0.25)",
                "card-shadow":
                    "0 .7vh 2vh rgba(54, 181, 208, 0.15), 0 0 .5vh rgba(54, 181, 208, 0.25)",
                "gradient-bg":
                    "linear-gradient(180deg, #162A45 0%, #0F1A2A 100%)",
                "gradient-primary": "linear-gradient(135deg, #36B5D0, #9C54FF)",
                "cosmic-glow-color1": "#36B5D0",
                "cosmic-glow-color2": "#9C54FF",
            },
            extraStyles: `
                body::before {
                    content: "";
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-image: 
                        radial-gradient(circle at 80% 30%, rgba(54, 181, 208, 0.035) 0%, transparent 40%),
                        radial-gradient(circle at 20% 70%, rgba(156, 84, 255, 0.035) 0%, transparent 40%);
                    z-index: -1;
                    pointer-events: none;
                }
                .section-title::after {
                    background: linear-gradient(90deg, #36B5D0, #9C54FF);
                }
            `,
        },
        lateNight: {
            name: "Late Night",
            timeRange: { start: 23, end: 23 },
            variables: {
                "bg-color": "#0D111D",
                "bg-color-alt": "#131A2C",
                "bg-color-rgb": "13, 17, 29",
                "primary-color": "#4285F4", 
                "primary-color-rgb": "66, 133, 244",
                "secondary-color": "#7367F0", 
                "secondary-color-rgb": "115, 103, 240",
                "accent-color": "#111729",
                "accent-color-alt": "#6ECDDD", 
                "accent-color-alt-rgb": "110, 205, 221",
                "text-color": "#C8D8FE",
                "text-color-headings": "#F5FBFF",
                "text-color-light": "#8C9DBE",
                "text-color-darker": "#506181",
                "neon-blue": "#1A73E8",
                "neon-green": "#27AE60",
                "neon-orange": "#F78C4A",
                "neon-pink": "#E345C1",
                "neon-purple": "#8A46FF",
                "glass-bg": "rgba(19, 26, 44, 0.85)",
                "glass-effect": "saturate(180%) blur(1vh)",
                "card-bg": "rgba(17, 23, 41, 0.9)",
                "card-border": "rgba(66, 133, 244, 0.28)",
                "card-shadow":
                    "0 .7vh 2vh rgba(66, 133, 244, 0.15), 0 0 .5vh rgba(66, 133, 244, 0.25)",
                "gradient-bg":
                    "linear-gradient(180deg, #131A2C 0%, #0D111D 100%)",
                "gradient-primary": "linear-gradient(135deg, #4285F4, #7367F0)",
                "cosmic-glow-color1": "#4285F4",
                "cosmic-glow-color2": "#7367F0",
            },
            extraStyles: `
                body::before {
                    content: "";
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-image: 
                        radial-gradient(circle at 85% 15%, rgba(66, 133, 244, 0.03) 0%, transparent 45%),
                        radial-gradient(circle at 15% 85%, rgba(115, 103, 240, 0.025) 0%, transparent 45%);
                    z-index: -1;
                    pointer-events: none;
                }
                .section-title::after {
                    background: linear-gradient(90deg, #4285F4, #7367F0);
                }
            `,
        },
        deadOfNight: {
            name: "Dead of Night",
            timeRange: { start: 1, end: 2 },
            variables: {
                "bg-color": "#090C14",
                "bg-color-alt": "#0F1525",
                "bg-color-rgb": "9, 12, 20",
                "primary-color": "#5D3FD3", 
                "primary-color-rgb": "93, 63, 211",
                "secondary-color": "#266ED7", 
                "secondary-color-rgb": "38, 110, 215",
                "accent-color": "#0B0F1A",
                "accent-color-alt": "#DF4B9C", 
                "accent-color-alt-rgb": "223, 75, 156",
                "text-color": "#B3C5E6", 
                "text-color-headings": "#E4ECFF",
                "text-color-light": "#7E94BC",
                "text-color-darker": "#475877",
                "neon-blue": "#276FEB",
                "neon-green": "#27DD8F",
                "neon-orange": "#FF5C38",
                "neon-pink": "#FF3399",
                "neon-purple": "#8A2BE2",
                "glass-bg": "rgba(15, 21, 37, 0.9)",
                "glass-effect": "saturate(180%) blur(1vh)",
                "card-bg": "rgba(11, 15, 26, 0.95)",
                "card-border": "rgba(93, 63, 211, 0.3)",
                "card-shadow":
                    "0 .8vh 2vh rgba(38, 110, 215, 0.15), 0 0 .5vh rgba(93, 63, 211, 0.3)",
                "gradient-bg":
                    "linear-gradient(180deg, #0F1525 0%, #090C14 100%)",
                "gradient-primary": "linear-gradient(135deg, #5D3FD3, #266ED7)",
                "cosmic-glow-color1": "#5D3FD3",
                "cosmic-glow-color2": "#266ED7",
            },
            extraStyles: `
                body::before {
                    content: "";
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-image: 
                        radial-gradient(circle at 80% 20%, rgba(93, 63, 211, 0.02) 0%, transparent 40%),
                        radial-gradient(circle at 20% 80%, rgba(38, 110, 215, 0.02) 0%, transparent 40%);
                    z-index: -1;
                    pointer-events: none;
                }
                .section-title::after {
                    background: linear-gradient(90deg, #5D3FD3, #266ED7);
                }
            `,
        },
    },
    currentTheme: "",
    manuallySelectedTheme: null,
    styleElement: null,
    init: function () {
        this.styleElement = document.createElement("style");
        this.styleElement.id = "dynamic-theme-styles";
        document.head.appendChild(this.styleElement);
        const themeToggle = document.getElementById("theme-toggle");
        if (themeToggle) {
            themeToggle.addEventListener("click", () => {
                this.toggleNextTheme();
            });
        }
        this.loadThemePreference();
        this.setupTimeBasedUpdates();
    },
    getCurrentHour: function () {
        return new Date().getHours();
    },
    getTimeBasedTheme: function () {
        const currentHour = this.getCurrentHour();
        for (const [themeKey, theme] of Object.entries(this.themes)) {
            const { timeRange } = theme;
            if (
                currentHour >= timeRange.start &&
                currentHour <= timeRange.end
            ) {
                return themeKey;
            }
        }
        return "night";
    },
    loadThemePreference: function () {
        const savedTheme = localStorage.getItem("portfolio-theme-key");
        if (savedTheme && this.themes[savedTheme]) {
            this.manuallySelectedTheme = savedTheme;
            this.applyTheme(savedTheme);
        } else {
            const timeBasedTheme = this.getTimeBasedTheme();
            this.applyTheme(timeBasedTheme);
        }
    },
    applyTheme: function (themeKey) {
        if (!this.themes[themeKey]) {
            console.error(`Theme '${themeKey}' not found!`);
            return;
        }
        const theme = this.themes[themeKey];
        this.currentTheme = themeKey;
        let cssVars = "";
        for (const [varName, value] of Object.entries(theme.variables)) {
            cssVars += `--${varName}: ${value};\n`;
        }
        document.documentElement.setAttribute("data-theme", "custom");
        document.documentElement.setAttribute("data-theme-name", theme.name);
        const themeToggle = document.getElementById("theme-toggle");
        if (themeToggle) {
            themeToggle.setAttribute("aria-label", `Theme: ${theme.name}`);
            themeToggle.setAttribute(
                "title",
                `Current theme: ${theme.name}. Click to change.`
            );
        }
        this.styleElement.textContent = `
            :root {
                ${cssVars}
            }
            ${theme.extraStyles}
        `;
        const event = new CustomEvent("themechange", {
            detail: { theme: themeKey, themeName: theme.name },
        });
        document.dispatchEvent(event);
        console.log(`Applied theme: ${theme.name}`);
    },
    toggleNextTheme: function () {
        const themeKeys = Object.keys(this.themes);
        const currentIndex = themeKeys.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % themeKeys.length;
        const nextTheme = themeKeys[nextIndex];
        this.manuallySelectedTheme = nextTheme;
        localStorage.setItem("portfolio-theme-key", nextTheme);
        this.applyTheme(nextTheme);
    },
    setupTimeBasedUpdates: function () {
        setInterval(() => {
            if (!this.manuallySelectedTheme) {
                const timeBasedTheme = this.getTimeBasedTheme();
                if (timeBasedTheme !== this.currentTheme) {
                    this.applyTheme(timeBasedTheme);
                }
            }
        }, 60000); 
        const now = new Date();
        const minutesToNextHour = 60 - now.getMinutes();
        const msToNextHour =
            minutesToNextHour * 60 * 1000 - now.getSeconds() * 1000;
        setTimeout(() => {
            if (!this.manuallySelectedTheme) {
                const timeBasedTheme = this.getTimeBasedTheme();
                if (timeBasedTheme !== this.currentTheme) {
                    this.applyTheme(timeBasedTheme);
                }
            }
            setInterval(() => {
                if (!this.manuallySelectedTheme) {
                    const timeBasedTheme = this.getTimeBasedTheme();
                    if (timeBasedTheme !== this.currentTheme) {
                        this.applyTheme(timeBasedTheme);
                    }
                }
            }, 3600000); 
        }, msToNextHour);
    },
    getThemeList: function () {
        return Object.entries(this.themes).map(([key, theme]) => ({
            key,
            name: theme.name,
        }));
    },
    setTheme: function (themeKey) {
        if (this.themes[themeKey]) {
            this.manuallySelectedTheme = themeKey;
            localStorage.setItem("portfolio-theme-key", themeKey);
            this.applyTheme(themeKey);
            return true;
        }
        return false;
    },
    resetToAutoTheme: function () {
        this.manuallySelectedTheme = null;
        localStorage.removeItem("portfolio-theme-key");
        const timeBasedTheme = this.getTimeBasedTheme();
        this.applyTheme(timeBasedTheme);
    },
};