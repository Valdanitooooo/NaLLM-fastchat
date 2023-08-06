import React, { useEffect, FC, useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import Cytoscapejs from "cytoscape";
import fcose from "cytoscape-fcose";
import { fcoseBilkentOptions, initStylesheet } from "./utils";

Cytoscapejs.use(fcose);
const colors = [
  "magenta",
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple",
];
const mockData = [
  {
    d: {
      identity: 1,
      prevent:
        "由于许多因素可诱发偏头痛，在生活起居中注意调护，避免这些因素对身体的侵袭，慎起居，调理饮食，情志等在一定程度可以预防偏头痛发作。\n偏头痛生活调理\n1、注意气侯的影响，风，燥，湿热，暴风雨，明亮耀眼的阳光，寒冷，雷声等气候变化均可诱发偏头痛发作，注意避风寒，保暖，不要暴晒淋雨，防止诱发致病。\n2、注意睡眠，运动或过劳的影响，注意规律的睡眠，运动，加强工作计划性，条理性，注意劳逸结合，注意眼睛调节，保护对敏感病人来说是重要的预防措施。\n3、注意室内通风，戒烟酒。\n4、注意药物的影响，可诱发偏头痛药物如避孕药，硝酸甘油，组织胺，利血平，肼苯达嗪，雌激素，过量VitA等。",
      cure_way: ["药物治疗", "康复治疗"],
      name: "偏头痛",
      cured_prob: "70-90%",
      cure_lasttime: "10-21天",
      cause:
        "口服避孕药可增加偏头痛发作的频度。月经是偏头痛常见的触发或加重因素(“周期性头痛”)。妊娠，性交可触发偏头痛发作(“性交性头痛”)。 某些易感个体服用硝苯地平(心痛定)，异山梨酯(消心痛)或硝酸甘油后可出现典型的偏头痛发作。\n特别是天气转热，多云或天气潮湿。最常见者是酒精性饮料，如某些红葡萄酒。奶制品，奶酪，特别是硬奶酪、咖啡、含亚硝酸盐的食物，如汤，热狗。某些水果，如柑橘类水果、巧克力(“巧克力性头痛”)。某些蔬菜、酵母、人工甜食、发酵的腌制品：如泡菜、味精。\n头部的微小运动可诱发偏头痛发作或使之加重，有些患者因惧怕乘车引起偏头痛发作而不敢乘车。踢足球的人以头顶球可诱发头痛(“足球运动员偏头痛”)。爬楼梯上楼可出现偏头痛。\n1、睡眠过多或过少。\n2、一顿饭漏吃或后延。\n3、抽烟或置身于烟中。\n4、闪光，灯光过强。\n5、紧张，生气，情绪低落，哭泣(“哭泣性头痛”)，很多女性逛商场或到人多的场合可致偏头痛发作。国外有人骑马时尽管拥挤不到1min，也可使偏头痛加重。\n在激发因素中，数量，联合作用及个体差异尚应考虑，如对于敏感个体，吃一片橘子可能不致引起头痛，而吃数枚橘子则可引起头痛，有些情况下，吃数枚橘子也不引起头痛发作，但如同时有月经的影响，这种联合作用就可引起偏头痛发作，有的个体在商场中呆一会儿即出现发作，而有的个体仅于商场中久待才出现偏头痛发作。\n偏头痛尚有很多改善因素，有人于偏头痛发作时静躺片刻，即可使头痛缓解，有人于光线较暗淡的房间闭目而使头痛缓解，有人于头痛发作时喜以双手压迫双颞侧，以期使头痛缓解，有人通过冷水洗头使头痛得以缓解，妇女绝经后及妊娠3个月后偏头痛趋于缓解。",
      cure_department: ["内科", "神经内科"],
      easy_get: "无特发人群",
      desc: "偏头痛是一类有家族发病倾向的周期性发作疾病，表现为发作性的偏侧搏动性头痛，伴恶心、呕吐及羞明，经一段歇期后再次发病，在安静、黑暗环境内或睡眠后头痛缓解。在头痛发生前或发作时可伴有神经，精神功能障碍。",
    },
    drug: { name: "阿司匹林肠溶胶囊", identity: 3 },
  },
  {
    d: {
      identity: 1,
      prevent:
        "由于许多因素可诱发偏头痛，在生活起居中注意调护，避免这些因素对身体的侵袭，慎起居，调理饮食，情志等在一定程度可以预防偏头痛发作。\n偏头痛生活调理\n1、注意气侯的影响，风，燥，湿热，暴风雨，明亮耀眼的阳光，寒冷，雷声等气候变化均可诱发偏头痛发作，注意避风寒，保暖，不要暴晒淋雨，防止诱发致病。\n2、注意睡眠，运动或过劳的影响，注意规律的睡眠，运动，加强工作计划性，条理性，注意劳逸结合，注意眼睛调节，保护对敏感病人来说是重要的预防措施。\n3、注意室内通风，戒烟酒。\n4、注意药物的影响，可诱发偏头痛药物如避孕药，硝酸甘油，组织胺，利血平，肼苯达嗪，雌激素，过量VitA等。",
      cure_way: ["药物治疗", "康复治疗"],
      name: "偏头痛",
      cured_prob: "70-90%",
      cure_lasttime: "10-21天",
      cause:
        "口服避孕药可增加偏头痛发作的频度。月经是偏头痛常见的触发或加重因素(“周期性头痛”)。妊娠，性交可触发偏头痛发作(“性交性头痛”)。 某些易感个体服用硝苯地平(心痛定)，异山梨酯(消心痛)或硝酸甘油后可出现典型的偏头痛发作。\n特别是天气转热，多云或天气潮湿。最常见者是酒精性饮料，如某些红葡萄酒。奶制品，奶酪，特别是硬奶酪、咖啡、含亚硝酸盐的食物，如汤，热狗。某些水果，如柑橘类水果、巧克力(“巧克力性头痛”)。某些蔬菜、酵母、人工甜食、发酵的腌制品：如泡菜、味精。\n头部的微小运动可诱发偏头痛发作或使之加重，有些患者因惧怕乘车引起偏头痛发作而不敢乘车。踢足球的人以头顶球可诱发头痛(“足球运动员偏头痛”)。爬楼梯上楼可出现偏头痛。\n1、睡眠过多或过少。\n2、一顿饭漏吃或后延。\n3、抽烟或置身于烟中。\n4、闪光，灯光过强。\n5、紧张，生气，情绪低落，哭泣(“哭泣性头痛”)，很多女性逛商场或到人多的场合可致偏头痛发作。国外有人骑马时尽管拥挤不到1min，也可使偏头痛加重。\n在激发因素中，数量，联合作用及个体差异尚应考虑，如对于敏感个体，吃一片橘子可能不致引起头痛，而吃数枚橘子则可引起头痛，有些情况下，吃数枚橘子也不引起头痛发作，但如同时有月经的影响，这种联合作用就可引起偏头痛发作，有的个体在商场中呆一会儿即出现发作，而有的个体仅于商场中久待才出现偏头痛发作。\n偏头痛尚有很多改善因素，有人于偏头痛发作时静躺片刻，即可使头痛缓解，有人于光线较暗淡的房间闭目而使头痛缓解，有人于头痛发作时喜以双手压迫双颞侧，以期使头痛缓解，有人通过冷水洗头使头痛得以缓解，妇女绝经后及妊娠3个月后偏头痛趋于缓解。",
      cure_department: ["内科", "神经内科"],
      easy_get: "无特发人群",
      desc: "偏头痛是一类有家族发病倾向的周期性发作疾病，表现为发作性的偏侧搏动性头痛，伴恶心、呕吐及羞明，经一段歇期后再次发病，在安静、黑暗环境内或睡眠后头痛缓解。在头痛发生前或发作时可伴有神经，精神功能障碍。",
    },
    drug: { name: "苯甲酸利扎曲普坦片", identity: 2 },
  },
];

const data = [
  { data: { id: "one", label: "Node 1" } },
  { data: { id: "two", label: "Node 2" } },
  { data: { source: "one", target: "two", label: "Edge from Node1 to Node2" } },
];

const formatData = (d: any[]) => {
  const nodes = [];
  const edges = [];
  try {
    const nodeKeys: string[] = [],
      nodeIds: string[] = [];

    for (const item of d) {
      let sourceId, targetId;
      for (const key in item) {
        const { identity, name, ...rest } = item[key];
        const keyIndex: number = nodeKeys.indexOf(key);
        if (keyIndex === -1) {
          // 未出现过的 node 类型直接push
          nodes.push({
            data: {
              id: identity,
              label: name,
              color: colors[nodeKeys.length - 1],
              ...rest,
            },
          });
          nodeKeys.push(key);
          nodeIds.push(identity);
        } else if (nodeIds.indexOf(identity) === -1) {
          // 已出现过的类型, 但 id 是新的表明这是一个新的节点
          nodes.push({
            data: {
              id: identity,
              label: name,
              color: colors[keyIndex],
              ...rest,
            },
          });
          nodeIds.push(identity);
        }
        if (sourceId) {
          targetId = identity;
        } else {
          sourceId = identity;
        }
        // 建边
        if (typeof sourceId !== 'undefined' && typeof targetId !== 'undefined') {
          edges.push({ data: { source: sourceId, target: targetId } });
        }
      }
    }
  } catch (error) {
    console.error('FORMAT GRAPH DATA ERROR:', error)
  }

  return [...nodes, ...edges];
};

interface ICytoscapeCompProps {
  dataSource: any;
}
const CytoscapeComp: FC<ICytoscapeCompProps> = ({ dataSource }) => {
  const [graphData, setGraphData] = useState<any[]>([]);
  useEffect(() => {
    if (dataSource) {
      setGraphData(formatData(dataSource));
    }
  }, [dataSource]);
  return (
    <CytoscapeComponent
      elements={graphData}
      style={{ height: "100vh" }}
      layout={fcoseBilkentOptions}
      minZoom={0.5}
      maxZoom={2}
      stylesheet={initStylesheet}
    />
  );
};

export default CytoscapeComp;
