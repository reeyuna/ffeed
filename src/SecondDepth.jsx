import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDepth } from "./store/appSlice";
import { createTheme, Tab, Tabs, ThemeProvider } from "@mui/material";
import { imageFileData } from "./data/imageFileData";
import furnishingData from "./data/furnishingData.json";

export default function SecondDepth() {
  const dispatch = useDispatch();

  const [value, setValue] = useState(0);
  const [newArray, setNewArray] = useState([]);

  const itemArray = furnishingData.FunishingData[0].CategoryList;

  useEffect(() => {
    // 가져온 데이터 맨 앞에 '전체'카테고리 추가
    setNewArray([
      {
        SubCategory: "전체",
      },
      ...itemArray,
    ]);
  }, []);

  // tab이 바뀔 때 실행
  const handleOnChange = (e, next) => {
    setValue(next);
  };

  // '의자'를 클릭하면 3 번째 depth로 이동
  const handleOnClickSecondDepth = () => {
    dispatch(setDepth(3));
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
      {/* 카테고리가 전체일 때 보여지는 화면 */}
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

// style
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
