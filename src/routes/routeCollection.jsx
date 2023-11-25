import { HomePage } from "../pagelist/homepage/HomePage";
import { PageNotFound } from "../pagelist/pagenotfound/PageNotFound";
import { QuestionPage } from "../pagelist/questionpage/QuestionPage";
import { SummaryPage } from "../pagelist/summarypage/SummaryPage";
import { Route } from "react-router-dom";

export const routeCollection = (
  <>
    {/* Route to the Home page */}
    <Route path="/" element={<HomePage />} />

    {/* This route leads to the element that displays when a user has entered an incorrect link/address */}
    <Route path="*" element={<PageNotFound />} />

    {/* Dynamic route to each question */}
    <Route path="/quest/:id" element={<QuestionPage />} />

    {/* Route to the summary page */}
    <Route path="/summary" element={<SummaryPage />} />
  </>
);
