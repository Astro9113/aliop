export function getServiceState(service) {
    // 信息不一致列表。
  const isConsistentList = [];
  for (const key in service) {
    if (service[key].info) {
      const name = service[key].info;
      if (name.isConsistent === 1) {
        isConsistentList.push(key);
      }
    } else {
      isConsistentList.push(key);
    }
  }
  return isConsistentList;
}

