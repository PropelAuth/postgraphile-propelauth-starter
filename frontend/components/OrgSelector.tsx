import {WithLoggedInAuthInfoProps, withRequiredAuthInfo} from "@propelauth/react";
import {ChangeEvent} from "react";

function OrgSelector(props: WithLoggedInAuthInfoProps) {
    // getSelectedOrg() will infer an intelligent default
    //   in case they haven't selected one yet
    const selectedOrg = props.orgHelper.getSelectedOrg();
    if (!selectedOrg) {
        return <div>No orgs found</div>
    }

    const orgs = props.orgHelper.getOrgs();
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => props.orgHelper.selectOrg(event.target.value);

    return <select value={selectedOrg.orgId} onChange={handleChange} className="orgSelect">
        {orgs.map(org => <option key={org.orgId} value={org.orgId}>{org.orgName}</option>)}
    </select>
}

export default withRequiredAuthInfo(OrgSelector);