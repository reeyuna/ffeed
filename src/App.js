import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDepth } from "./store/appSlice";
import {
  createTheme,
  MenuItem,
  Select,
  Tab,
  Tabs,
  ThemeProvider,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import furnishingData from "./data/furnishingData.json";
import { imageFileData } from "./data/imageFileData";

import SecondDepth from "./SecondDepth";
import ThirdDepth from "./ThirdDepth";

function App() {
  const dispatch = useDispatch();

  const [selectValue, setSelectValue] = useState(0);
  const [secondSelectValue, setSecondSelectValue] = useState(0);
  const [value, setValue] = useState(0);

  const depth = useSelector((state) => state.app.depth);

  const firstDepthArray = furnishingData.FunishingData;
  const itemArray = furnishingData.FunishingData[0].CategoryList;

  // 1) 1 번째 depth에서 tab클릭 시 실행
  // 2) 1 번째 depth에서 좌측 상단 select option 클릭 시 실행
  const handleOnClickFirstDepth = (e, index) => {
    // depth를 2로 변경
    dispatch(setDepth(2));

    // select에 표시되는 값 변경
    setSelectValue(index + 1);
  };

  // 1 번째 depth에서 좌측 상단 select option 클릭 시 실행
  const handleSelect = (e) => {
    dispatch(setDepth(2));

    setSelectValue(e.target.value);
  };

  // 3 번째 depth에서 좌측 상단 select option 클릭 시 실행
  const handleOnClickThirdDepth = (e) => {
    setSecondSelectValue(e.target.value);
  };

  // depth에 따라 보여지는 main content가 바뀜
  const showTabItems = () => {
    switch (depth) {
      case 2:
        return <SecondDepth />;
        break;
      case 3:
        return <ThirdDepth selectValue={secondSelectValue} />;
        break;

      default:
        break;
    }
  };
  return (
    <div>
      <div style={{ height: "70px" }}>
        {/* 1 번째, 2 번째 depth에서 보여질 상단 select */}
        {(depth === 1 || depth === 2) && (
          <ThemeProvider theme={theme}>
            <Select
              value={selectValue}
              defaultValue={0}
              onChange={handleSelect}
              IconComponent={KeyboardArrowDownIcon}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "& .MuiSelect-select": {
                  fontFamily: `"Noto Sans KR", sans-serif`,
                  fontSize: "18px",
                  fontWeight: "bold",
                  border: "0px",
                },
              }}
            >
              <MenuItem value={0}>제품 전체</MenuItem>
              {firstDepthArray?.map((item, index) => (
                <MenuItem key={index} value={index + 1}>
                  {item.MainCategory}
                </MenuItem>
              ))}
            </Select>
          </ThemeProvider>
        )}

        {/*  첫 번째 depth에서 보여지는 화면(tab, main content) */}
        {depth === 1 && (
          <>
            <ThemeProvider theme={theme}>
              <Tabs sx={{ marginBottom: 7 }} value={value} variant="scrollable">
                <Tab label="제품 전체" index={0} />
                {firstDepthArray?.map((item, index) => (
                  <Tab
                    key={index}
                    label={item.MainCategory}
                    index={index + 1}
                    onClick={(e) => handleOnClickFirstDepth(e, index)}
                  />
                ))}
              </Tabs>
            </ThemeProvider>
            {value === 0 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2,1fr)",
                  columnGap: 8,
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
          </>
        )}
        {/*  세 번째 depth에서 보여지는 화면(상단 select) */}
        {depth === 3 && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              onClick={() => {
                dispatch(setDepth(1));
                setSecondSelectValue(0);
                setSelectValue(0);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                color: "grey",
                fontWeight: "bold",
                fontSize: "18px",
                marginRight: 10,
              }}
            >
              {firstDepthArray[0].MainCategory}

              <ArrowForwardIosIcon
                sx={{
                  marginLeft: "10px",
                  fontSize: "18px",
                }}
              />
            </div>
            <div>
              <Select
                value={secondSelectValue}
                defaultValue={0}
                onChange={handleOnClickThirdDepth}
                IconComponent={KeyboardArrowDownIcon}
                sx={{
                  div: {
                    paddingLeft: 0,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "& .MuiSelect-select": {
                    fontFamily: `"Noto Sans KR", sans-serif`,
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "black",
                    border: "0px",
                  },
                }}
              >
                {itemArray?.map((item, index) => (
                  <MenuItem key={index} value={index}>
                    {item.SubCategory}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
        )}
      </div>

      {showTabItems()}
    </div>
  );
}

// style
const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      defaultProps: {
        notchedOutline: {
          style: {
            border: "none",
          },
        },
      },
    },

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
export default App;
