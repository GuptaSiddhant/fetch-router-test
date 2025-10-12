import { test } from "node:test";
import { equal } from "node:assert/strict";
import {
  createResources,
  createRouter,
  createRoutes,
  type RouteHandlers,
} from "@remix-run/fetch-router";

const routes = createRoutes({
  index: "/",
  items: createResources("/items"),
});

const handlers = {
  index() {
    return Response.json({});
  },
  items: {
    index: () => Response.json({}),
    new: () => Response.json({}),
    create: () => Response.json({}),
    show: ({ params }) => Response.json({ id: params.id }),
    edit: ({ params }) => Response.json({ id: params.id }),
    update: ({ params }) => Response.json({ id: params.id }),
    destroy: ({ params }) => Response.json({ id: params.id }),
  },
} satisfies RouteHandlers<typeof routes>;

const router = createRouter();
router.map(routes, handlers);

test("response should match id-param", async () => {
  const id = "11400";
  const response = await router.fetch("http://localhost:3000/items/" + id);
  const data = await response.json();
  equal(data["id"], id);
});
