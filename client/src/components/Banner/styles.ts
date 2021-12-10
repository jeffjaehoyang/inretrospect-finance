import styled from "styled-components";
import tw from "twin.macro";

export const BannerWrapper = styled.div`
  ${tw`flex flex-col justify-center items-center w-full mt-4 mb-4 rounded-2xl bg-gradient-to-r from-green-100 to-green-200 text-3xl p-3 text-center`};
  min-height: 200px;
`;
