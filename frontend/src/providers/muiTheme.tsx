import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiAccordion: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          minHeight: "77px",
          width: "100%",
          backgroundColor: "transparent",
          color: "#C2C2C2",
          fontSize: "24px",
          fontWeight: "500",
          borderBottom: "1px solid rgba(255, 255, 255, 0.16)",
          borderBottomLeftRadius: "0 !important",
          borderBottomRightRadius: "0 !important",
          "&:before": {
            display: "none",
          },
          "& .MuiAccordionSummary-root": {
            flexDirection: "row-reverse",
            gap: "10px",
            position: "relative",
          },
          "& .MuiAccordionDetails-root": {
            color: "rgba(247, 247, 247, 0.6)",
            fontSize: "20px",
            fontWeight: "400",
            lineHeight: "140%",
          },
          "& .MuiAccordionSummary-content": {
            margin: "24px 0",
            color: "#C2C2C2",
            fontSize: "24px",
            fontWeight: "500",
            maxWidth: "calc(100% - 32px)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "inline-block",
          },
          "& .MuiAccordionSummary-expandIconWrapper": {
            transform: "scale(1, 1)",
            "&.Mui-expanded": {
              transform: "scale(-1, -1)",
            },
          },
          "& .MuiCollapse-root": {
            marginTop: "-24px",
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "#fff",
          padding: "16px 24px",
          borderRadius: "8px",
          border: "1px solid rgba(255, 255, 255, 0.16)",
          backdropFilter: "blur(11.5px)",
          "& .MuiList-root": {
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          },
          "& .MuiMenuItem-root": {
            padding: 0,
            fontFamily: "Inter, sans-serif",
            color: "#c2c2c2",
            fontSize: "16px",
            fontWeight: "500",
            lineHeight: "140%",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: "transparent",
              color: "#fff",
            },
          },
        },
      },
    },
    MuiTooltip: {
      defaultProps: {
        placement: "top",
      },
      styleOverrides: {
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "#fff",
          fontSize: "16px",
          fontWeight: "500",
          lineHeight: "140%",
          padding: "16px 24px",
          borderRadius: "8px",
          border: "1px solid rgba(255, 255, 255, 0.16)",
          backdropFilter: "blur(11.5px)",
          maxWidth: "600px",
        },
      },
    },
    MuiSwitch: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          width: "52px",
          height: "32px",
          padding: 0,
          "& .MuiSwitch-track": {
            with: "100%",
            height: "100%",
            padding: "8px",
            borderRadius: "8888px",
            border: " 1.5px solid #C2C2C2",
            transition: "all 150ms linear",
          },
          "& .MuiSwitch-switchBase": {
            padding: "8px",
            "&.Mui-checked": {
              "& + .MuiSwitch-track": {
                backgroundColor: "#C2C2C2",
              },
              "& .MuiSwitch-thumb": {
                background: "#1E1E1E",
              },
            },
          },
          "& .MuiSwitch-thumb": {
            backgroundColor: "#C2C2C2",
            width: "16px",
            height: "16px",
            transition: "all 150ms linear",
          },
        },
      },
    },
    MuiRadio: {
      defaultProps: {
        disableRipple: true,
        icon: (
          <div
            style={{
              display: "flex",
              width: "20px",
              height: "20px",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              border: "1px solid rgba(247, 247, 247, 0.60)",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                border: "1px solid rgba(247, 247, 247, 0.60)",
              }}
            />
          </div>
        ),
      },
      styleOverrides: {
        root: {
          padding: 0,
          width: "20px",
          height: "20px",
          color: "#C2C2C2",
          "&.Mui-checked": {
            color: "#C2C2C2",
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.16)",
          backgroundColor: "#c2c2c2",
          color: "#2B2B2B",
          fontFamily: "Inter, sans-serif",
          fontSize: "18px",
          fontWeight: "500",
          lineHeight: "100%",
          textTransform: "none",
          height: "52px",
          padding: "0 11px",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            backgroundColor: "#fff",
            border: "1px solid #fff",
            color: "#2B2B2B",
          },
          "&[disabled]": {
            border: "1px solid rgba(255, 255, 255, 0.16)",
            backgroundColor: "rgba(174, 174, 174, 0.04)",
            color: "#fff",
            opacity: "0.5",
          },
          "&.MuiButton-sizeSmall": {
            height: "40px",
            fontSize: "16px",
          },
          "&.MuiButton-colorSecondary": {
            backgroundColor: "rgba(174, 174, 174, 0.04)",
            color: "#c2c2c2",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.16)",
              border: "1px solid #fff",
              color: "#fff",
            },
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            padding: "0 !important",
          },
          "& input, & textarea": {
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.16)",
            backgroundColor: "#2b2b2b",
            color: "rgba(247, 247, 247, 0.60)",
            fontFamily: "Commissioner, sans-serif",
            fontSize: "16px",
            fontWeight: "400",
            lineHeight: "150%",
            textTransform: "none",
            minHeight: "52px",
            maxHeight: "500px",
            padding: "16px 20px !important",
            boxSizing: "border-box",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              border: "1px solid #fff",
            },
            "&:focus": {
              border: "1px solid #fff",
            },
            "&:active": {
              border: "1px solid #fff",
            },
            "&:placeholder": {
              fontSize: "16px",
              fontWeight: "400",
              lineHeight: "150%",
              color: "rgba(247, 247, 247, 0.6)",
              textTransform: "none",
              opacity: 1,
            },
            "&[disabled]": {
              opacity: "0.5",
              pointerEvents: "none",
              WebkitTextFillColor: "#fff",
            },
          },
          "& fieldset": {
            display: "none",
          },
        },
      },
    },
  },
});
