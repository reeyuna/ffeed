import { useEffect, useState } from "react";
import {
  createTheme,
  MenuItem,
  Select,
  Tab,
  Tabs,
  ThemeProvider,
} from "@mui/material";
import "./App.css";
import { imageFileData } from "./data/imageFileData";
import furnishingData from "./data/furnishingData.json";
import ThirdDepth from "./ThirdDepth";
import { useDispatch, useSelector } from "react-redux";
import { setDepth } from "./store/appSlice";
import App from "./App";

export default function SecondDepth() {
  const dispatch = useDispatch();

  const [selectValue, setSelectValue] = useState(0);
  const [value, setValue] = useState(0);

  const depth = useSelector((state) => state.app.depth);

  const [newArray, setNewArray] = useState([]);

  const firstDepthArray = furnishingData.FunishingData;

  const itemArray = furnishingData.FunishingData[0].CategoryList;

  useEffect(() => {
    setNewArray([
      {
        SubCategory: "전체",
      },
      ...itemArray,
    ]);
  }, []);

  const handleOnChange = (e, next) => {
    setValue(next);
  };

  const handleOnClickSecondDepth = () => {
    dispatch(setDepth(3));
  };

  const showTabItems2 = () => {
    switch (value) {
      case 1:
        return <ThirdDepth />;
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        {depth === 2 && (
          <Tabs
            value={value}
            sx={{ marginBottom: 7 }}
            onChange={handleOnChange}
            variant="scrollable"
          >
            {newArray?.map((item, index) => (
              <Tab
                key={index}
                value={index}
                label={item.SubCategory}
                index={index}
                onClick={() => {
                  if (index === 1) handleOnClickSecondDepth();
                }}
              />
            ))}
          </Tabs>
        )}
      </ThemeProvider>

      {value === 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)" }}>
          {imageFileData?.map((item, index) => (
            <div key={index} style={{ marginBottom: "40px" }}>
              <img
                src={`${process.env.PUBLIC_URL}/images/${item.url}.jpg`}
                style={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: "1 / 1",
                  objectFit: "cover",
                }}
              />
              <div style={{ marginTop: 18 }}>
                <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                  {item.name}{" "}
                  <span style={{ color: "grey" }}>({item.EName})</span>
                </div>
                <div style={{ marginTop: 8, fontWeight: "bold" }}>
                  {item.ESubName}
                </div>
                <div style={{ marginTop: 5, color: "grey" }}>
                  {item.subName}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const theme = createTheme({
  components: {
    MuiTabs: {
      defaultProps: {
        TabIndicatorProps: {
          style: {
            display: "block",
            background: "#2b2b2b",
            height: "6px",
          },
        },
      },
      styleOverrides: {
        root: {
          // borderRight: 1,
          // borderColor: "divider",
          // backgroundColor: "#F8F8FA",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          height: "60px",
          fontFamily: "'Noto Sans KR', sans-serif",
          fontSize: "20px",
          color: "rgba(0,0,0,0.4)",
          fontWeight: 600,
          "&.Mui-selected": {
            color: "rgba(0,0,0,1)",
            fontWeight: 600,
          },
        },
      },
    },
  },
});
