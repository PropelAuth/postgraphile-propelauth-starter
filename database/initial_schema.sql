-- An example multi-tenant schema where the users and organizations are manage by PropelAuth
--   so all we need is a user_id and org_id
CREATE TABLE wiki_page (
  -- The organization that owns this wiki page
  org_id          VARCHAR(36) NOT NULL,
  id              UUID NOT NULL DEFAULT gen_random_uuid(),

  -- The person that created the wiki page
  author_user_id  VARCHAR(36) NOT NULL,

  title           VARCHAR(100) NOT NULL,
  body            TEXT NOT NULL,
  
  PRIMARY KEY (org_id, id)
);


-- We don't want users to be able to specify their own IDs, so use smart comments
COMMENT ON COLUMN wiki_page.id IS '@omit create,update';



-- Enable row level security for the table
ALTER TABLE wiki_page ENABLE ROW LEVEL SECURITY;


-- Create a role that we will assume from our backend
CREATE ROLE member;
GRANT SELECT, INSERT, UPDATE, DELETE ON wiki_page TO member;


-- When a user is access the wiki_page table, they can only
--   access organizations they explicitly have access to
-- They can also only create/update roles for their organization and user_id
CREATE POLICY only_access_your_own_org ON wiki_page
    USING (org_id = current_setting('propelauth.org_id'))
    WITH CHECK (org_id = current_setting('propelauth.org_id') 
        AND author_user_id = current_setting('propelauth.user_id'));
