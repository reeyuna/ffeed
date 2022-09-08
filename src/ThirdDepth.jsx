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
import furnishingData from "./data/furnishingData.json";
import { imageFileData } from "./data/imageFileData";
import { useDispatch, useSelector } from "react-redux";

export default function ThirdDepth({ selectValue }) {
  const [value, setValue] = useState(0);
  const [newArray, setNewArray] = useState([]);

  const itemArray =
    furnishingData.FunishingData[0].CategoryList[0].CategoryList;

  const chairArray = imageFileData.filter((item) => item.category === "의자");
  const diningChairArray = imageFileData.filter(
    (item) => item.subCategory === "다이닝체어"
  );
  const stoolArray = imageFileData.filter(
    (item) => item.subCategory === "벤치/스툴"
  );
  const swArray = imageFileData.filter(
    (item) => item.subCategory === "스웨벨체어"
  );
  const stArray = imageFileData.filter(
    (item) => item.subCategory === "스태킹체어"
  );

  useEffect(() => {
    setNewArray([
      {
        SmallCategory: "전체",
      },
      ...itemArray,
    ]);
  }, []);

  const handleOnClickSecondDepth = (e, next) => {
    setValue(next);
  };
  return (
    <div>
      {selectValue === 0 && (
        <>
          <ThemeProvider theme={theme}>
            <Tabs
              value={value}
              sx={{ marginBottom: 7 }}
              onChange={handleOnClickSecondDepth}
              variant="scrollable"
            >
              {newArray?.map((item, index) => (
                <Tab
                  key={index}
                  value={index}
                  label={item.SmallCategory}
                  index={index}
                  onClick={() => {
                    // if (index === 1) setDepth(3);
                  }}
                />
              ))}
            </Tabs>
          </ThemeProvider>
          <div style={{ marginTop: 40 }}>
            {value === 0 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2,1fr)",
                }}
              >
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
            {value === 1 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2,1fr)",
                }}
              >
                {diningChairArray?.map((item, index) => (
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
            {value === 2 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2,1fr)",
                }}
              >
                {stoolArray?.map((item, index) => (
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
            {value === 3 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2,1fr)",
                }}
              >
                {swArray?.map((item, index) => (
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
            {value === 4 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2,1fr)",
                }}
              >
                {stArray?.map((item, index) => (
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
        </>
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
          fontFamily: "'Noto Sans KR', sans-serif",
          height: "60px",
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
