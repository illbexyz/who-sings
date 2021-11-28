import { NextApiRequest, NextApiResponse } from "next";

interface Hello {
  hello: string;
}

export default (req: NextApiRequest, res: NextApiResponse<Hello>) => {
  res.status(200).json({ hello: "Hello!" });
};
