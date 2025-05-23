import wixData from "wix-data";

const datasetTemplateExternalInformation = 'TravelExInfoDetails';
const datasetTemplateStationsPlan = 'TravelStationsPlan';
let externalInformationId;
let noButtonIdKeyValueMap = {};

$w.onReady(async function () {
    //const templateId = $w("#templateId");
    let itemObj = $w("#productItemDataset").getCurrentItem();
    const templateId = itemObj ? itemObj._id : null;
 
    console.log(`Template id ${templateId}` )
    //const templateId = "28107eea-e4fa-e166-4b31-7395121573a6"; 
    try {
        await queryExternalInformationOfTemplate(templateId);
        setUpStationsPlan(1);
        setUpSwitchState();
    } catch (err) {
        console.error("Error in querying external information:", err);
        // Optionally display a user-friendly message here
    }
});

async function queryExternalInformationOfTemplate(templateId) {
    try {
        const results = await wixData.query(datasetTemplateExternalInformation)
            .eq('productId', templateId)
            .include()
            .find();

        if (results.items.length > 0) {
            const foundedRecord = results.items[0];
            $w("#ratingsDisplay1").numRatings = foundedRecord.countFeedback;
            $w("#ratingsDisplay1").rating = foundedRecord.rating;
            $w("#period").text = `Có giá trị sử dụng trong vòng ${foundedRecord.numberDaysValid} ngày`;
            $w("#button19").label = `Quãng đường: ${foundedRecord.distance} ${foundedRecord.unitMeasureOfDistance}`;
            $w("#button18").label = `Chi phí dự kiến: ~ ${foundedRecord.estimatedCost} đ / người`;
            externalInformationId = foundedRecord._id;
            await queryStationsPlan(foundedRecord._id); // Chuyển sang async
        } else {
            console.warn("No records found.");
            return Promise.reject("No records found.");
        }
    } catch (err) {
        console.error("Query error:", err);
        return Promise.reject(err);
    }
}

async function queryStationsPlan(externalInformationId) {
    try {

        let results = await wixData.query(datasetTemplateStationsPlan)
        .include("templateReference")
        .find()
        .then((queryResults) => {
            // Tạo đối tượng `results` với thuộc tính `items` chứa các phần tử đã lọc
            return {
                items: queryResults.items.filter(item => item.templateReference?._id === externalInformationId)
            };
        })
        .catch((error) => {
            console.error("Error querying dataset:", error);
            return { items: [] }; // Trả về một đối tượng với `items` là mảng rỗng nếu có lỗi
        });
            console.log(results);
            console.log(results.items.length);

        if (results.items.length > 0) {
            const dateOrders = results.items.map(item => item.dateOrder);
            const uniqueDateOrders = [...new Set(dateOrders)];
            const numOfDays = uniqueDateOrders.length;
            console.log("Number of unique days: ", numOfDays);
            renderTabs(numOfDays);
        } else {
            console.warn("No stations found.");
        }
    } catch (err) {
        console.error("Error querying stations plan:", err);
    }
}

function renderTabs(numOfTabs) {
    const myChildren = $w("#box202").children;
    myChildren.forEach((child, index) => {
        if (index < numOfTabs) {
            $w(`#${child.id}`).label = `Ngày ${index + 1}`;
            $w(`#${child.id}`).show();
            console.log(`Showing tab for day ${index + 1}`);
            noButtonIdKeyValueMap[index + 1] = $w(`#${child.id}`);

            $w(`#${child.id}`).onClick(() => {
                console.log(`Button clicked: Ngày ${index + 1}`);
                $w(`#${child.id}`).style.backgroundColor = "#183597";
                $w(`#${child.id}`).style.color = "#FFFFFF";

                myChildren.forEach((otherChild, otherIndex) => {
                    if (otherIndex < numOfTabs && otherIndex !== index) {
                        $w(`#${otherChild.id}`).style.backgroundColor = "#FFFFFF"; // màu nền mặc định
                        $w(`#${otherChild.id}`).style.color = "#183597"; // màu chữ mặc định
                    }
                });
                
                $w("#txtSetOffHeader").text = `Chọn trạm`;
                $w("#richContentSetOff").content = "";

                $w("#txtExploreHeader").text = `Chọn trạm`;
                $w("#richContentExplore").content = "";

                $w("#txtEatHeader").text = `Chọn trạm`;
                $w("#richContentEat").content = "";

                setUpStationsPlan(index + 1);
            });
        } else {
            $w(`#${child.id}`).hide();
        }
    });
    return noButtonIdKeyValueMap;
}

async function setUpStationsPlan(dayNo) {
    try {
        //const results = await wixData.queryReferenced(datasetTemplateExternalInformation, externalInformationId, "stationsPlan", options);
        let results = await wixData.query(datasetTemplateStationsPlan)
        .include("templateReference")
        .find()
        .then((queryResults) => {
            // Tạo đối tượng `results` với thuộc tính `items` chứa các phần tử đã lọc
            return {
                items: queryResults.items.filter(item => item.templateReference?._id === externalInformationId)
            };
        })
        .catch((error) => {
            console.error("Error querying dataset:", error);
            return { items: [] }; // Trả về một đối tượng với `items` là mảng rỗng nếu có lỗi
        });
        
        if (results.items.length > 0) {
            const filteredRowsByDateOrder = results.items.filter(item => item.dateOrder === dayNo);
            const sortedFilteredRows = filteredRowsByDateOrder.sort((a, b) => a.orderNo - b.orderNo);
            
            console.log("Filtered rows with dateOrder matching dayNo: ", sortedFilteredRows);
            $w("#repeater1").onItemReady(($item, itemData) => {
                $item('#box').onClick(() => {
                    $w("#txtSetOffHeader").text = `Ngày ${itemData.dateOrder} - Trạm ${itemData.orderNo} - ${itemData.locationName} - Di chuyển`;
                    $w("#richContentSetOff").content = itemData.transportInstruction;

                    $w("#txtExploreHeader").text = `Ngày ${itemData.dateOrder} - Trạm ${itemData.orderNo} - ${itemData.locationName} - Thăm Quan`;
                    $w("#richContentExplore").content = itemData.sightSeeingSpots;

                    $w("#txtEatHeader").text = `Ngày ${itemData.dateOrder} - Trạm ${itemData.orderNo} - ${itemData.locationName} - Ăn uống`;
                    $w("#richContentEat").content = itemData.eatAndRestPlace;
                });
            });

            if (sortedFilteredRows.length > 0) {
                $w("#repeater1").data = sortedFilteredRows;
            }
        } else {
            console.warn("No stations found.");
        }
    } catch (err) {
        console.error("Error setting up stations plan:", err);
    }
}

function setUpSwitchState() {
    $w("#btnSetOff").onClick(() => {
        $w("#muiltiStateBoxTravel").changeState("boxStateForSetOff");
        $w("#btnSetOff").style.backgroundColor = "#183597";
        $w("#btnSetOff").style.color = "#FFFFFF";
        resetButtonStyles(["#btnExplore", "#btnEat", "#btnMap"]);
    });

    $w("#btnExplore").onClick(() => {
        $w("#muiltiStateBoxTravel").changeState("boxStateForExplore");
        $w("#btnExplore").style.backgroundColor = "#183597";
        $w("#btnExplore").style.color = "#FFFFFF";
        resetButtonStyles(["#btnSetOff", "#btnEat", "#btnMap"]);
    });

    $w("#btnEat").onClick(() => {
        $w("#muiltiStateBoxTravel").changeState("boxStateForEat");
        $w("#btnEat").style.backgroundColor = "#183597";
        $w("#btnEat").style.color = "#FFFFFF";
        resetButtonStyles(["#btnSetOff", "#btnExplore", "#btnMap"]);
    });

    $w("#btnMap").onClick(() => {
        $w("#muiltiStateBoxTravel").changeState("boxStateViewMap");
        $w("#btnMap").style.backgroundColor = "#183597";
        $w("#btnMap").style.color = "#FFFFFF";
        resetButtonStyles(["#btnSetOff", "#btnEat", "#btnExplore"]);
    });
}

function resetButtonStyles(buttonIds) {
    buttonIds.forEach(buttonId => {
        $w(buttonId).style.backgroundColor = "#FFFFFF"; // màu nền mặc định
        $w(buttonId).style.color = "#183597"; // màu chữ mặc định
    });
}
