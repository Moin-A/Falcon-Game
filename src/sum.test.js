import { find_totalTime, Normalize_request_bdy } from "./utility/helper";
test("find_totaltime resut to be equal 20", () => {
  let data = [
    { vehicle: { speed: 20 }, planet: { distance: 200 } },
    { vehicle: { speed: 20 }, planet: { distance: 200 } },
  ];
  expect(find_totalTime(data)).toBe(20);
});

test("Normalised_data resut to be equal 20", () => {
  let data = [
    {
      vehicle: { name: "Space pod", speed: 20 },
      planet: { name: "jebing", distance: 200 },
    },
  ];
  expect(JSON.stringify(Normalize_request_bdy(data))).toBe(
    '{"planet_names":["jebing"],"vehicle_names":["Space pod"]}'
  );
});
