IF OBJECT_ID('sys_tenant', 'U') IS NOT NULL
  DROP TABLE sys_tenant;
GO
CREATE TABLE sys_tenant
(
    id                    bigint                          NOT NULL,
    tenant_id             nvarchar(20)                    NOT NULL,
    contact_user_name     nvarchar(255)                   NULL,
    contact_phone         nvarchar(20)                    NULL,
    company_name          nvarchar(255)                   NULL,
    license_number        nvarchar(30)                    NULL,
    address               nvarchar(200)                   NULL,
    intro                 nvarchar(200)                   NULL,
    domain                nvarchar(200)                   NULL,
    remark                nvarchar(200)                   NULL,
    package_id            bigint                          NULL,
    expire_time           datetime2(7)                    NULL,
    account_count         int             DEFAULT ((-1))  NULL,
    status                nchar(1)        DEFAULT ('0')   NULL,
    del_flag              nchar(1)        DEFAULT ('0')   NULL,
    create_dept           bigint                          NULL,
    create_by             bigint                          NULL,
    create_time           datetime2(7)                    NULL,
    update_by             bigint                          NULL,
    update_time           datetime2(7)                    NULL,
    CONSTRAINT PK__sys_tenant__B21E8F2427725F8A PRIMARY KEY CLUSTERED (id)
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
)
ON [PRIMARY]
GO

INSERT sys_tenant VALUES (1, N'000000', N'Management group', N'0969753414', N'XXX Limited', NULL, NULL, N'Multi-tenant general background management system', NULL, NULL, NULL, NULL, -1, N'0', N'0', 103, 1, getdate(), NULL, NULL)
GO

IF OBJECT_ID('sys_tenant_package', 'U') IS NOT NULL
  DROP TABLE sys_tenant_package;
GO
CREATE TABLE sys_tenant_package
(
    package_id            bigint                          NOT NULL,
    package_name          nvarchar(20)                    NOT NULL,
    menu_ids              nvarchar(20)                    NULL,
    remark                nvarchar(200)                   NULL,
    menu_check_strictly   tinyint         DEFAULT ((1))   NULL,
    status                nchar(1)        DEFAULT ('0')   NULL,
    del_flag              nchar(1)        DEFAULT ('0')   NULL,
    create_dept           bigint                          NULL,
    create_by             bigint                          NULL,
    create_time           datetime2(7)                    NULL,
    update_by             bigint                          NULL,
    update_time           datetime2(7)                    NULL,
    CONSTRAINT PK__sys_tenant_package__B21E8F2427725F8A PRIMARY KEY CLUSTERED (package_id)
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
)
ON [PRIMARY]
GO

IF OBJECT_ID('sys_dept', 'U') IS NOT NULL
  DROP TABLE sys_dept;
GO
CREATE TABLE sys_dept
(
    dept_id     bigint                     NOT NULL,
    tenant_id   nvarchar(20) DEFAULT ('000000') NULL,
    parent_id   bigint       DEFAULT ((0)) NULL,
    ancestors   nvarchar(500)DEFAULT ''    NULL,
    dept_name   nvarchar(255) DEFAULT ''    NULL,
    order_num   int          DEFAULT ((0)) NULL,
    leader      nvarchar(20)               NULL,
    phone       nvarchar(11)               NULL,
    email       nvarchar(255)               NULL,
    status      nchar(1)     DEFAULT ('0') NULL,
    del_flag    nchar(1)     DEFAULT ('0') NULL,
    create_dept bigint                     NULL,
    create_by   bigint                     NULL,
    create_time datetime2(7)               NULL,
    update_by   bigint                     NULL,
    update_time datetime2(7)               NULL,
    CONSTRAINT PK__sys_dept__DCA659747DE13804 PRIMARY KEY CLUSTERED (dept_id)
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
)
ON [PRIMARY]
GO

INSERT sys_dept VALUES (100, N'000000', 0, N'0', N'STAR CINEMA', 0, N'Administrator', N'0969753414', N'star-cinema@gmail.com', N'0', N'0', 103, 1, getdate(), NULL, NULL)
GO
INSERT sys_dept VALUES (101, N'000000', 100, N'0,100', N'Quản lý phòng chiếu', 1, N'Nguyễn Ngọc Phú', N'0775545294', N'phunguyen@gmail.com', N'0', N'0', 103, 1, getdate(), NULL, NULL)
GO
INSERT sys_dept VALUES (102, N'000000', 100, N'0,100', N'Quản lý lịch chiếu', 2, N'Nguyễn Văn Cường', N'0346844010', N'cuongnguyen@gmail.com', N'0', N'0', 103, 1, getdate(), NULL, NULL)
GO
INSERT sys_dept VALUES (103, N'000000', 100, N'0,100', N'Quản lý vé', 2, N'Trần Văn Hữu', N'0383609548', N'huutran@gmail.com', N'0', N'0', 103, 1, getdate(), NULL, NULL)
GO
INSERT sys_dept VALUES (104, N'000000', 100, N'0,100', N'Quản lý doanh thu', 2, N'Nguyễn Minh Quốc', N'0933071554', N'quocnguyen@gmail.com', N'0', N'0', 103, 1, getdate(), NULL, NULL)
GO

IF OBJECT_ID('sys_notice', 'U') IS NOT NULL
  DROP TABLE sys_notice;
GO
CREATE TABLE sys_notice
(
    notice_id      bigint                     NOT NULL,
    tenant_id      nvarchar(20) DEFAULT ('000000') NULL,
    notice_title   nvarchar(255)               NOT NULL,
    notice_type    nchar(1)                   NOT NULL,
    notice_content nvarchar(max)              NULL,
    status         nchar(1)     DEFAULT ('0') NULL,
    create_dept    bigint                     NULL,
    create_by      bigint                     NULL,
    create_time    datetime2(7)               NULL,
    update_by      bigint                     NULL,
    update_time    datetime2(7)               NULL,
    remark         nvarchar(255)              NULL,
    CONSTRAINT PK__sys_noti__3E82A5DB0EC94801 PRIMARY KEY CLUSTERED (notice_id)
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
)
ON [PRIMARY]
TEXTIMAGE_ON [PRIMARY]
GO

INSERT sys_notice VALUES (1, N'000000', N'Reminder: 2023-11-20 A new version has been released', N'4', N'New version content', N'0', 103, 1, getdate(), NULL, NULL, N'administrator')
GO
INSERT sys_notice VALUES (2, N'000000', N'Maintenance notice: 2023-11-01 Star cinema system maintenance in the early morning', N'4', N'Maintenance content', N'0', 103, 1, getdate(), NULL, NULL, N'administrator')
GO

IF OBJECT_ID('sys_post', 'U') IS NOT NULL
  DROP TABLE sys_post;
GO
CREATE TABLE sys_post
(
    post_id     bigint                          NOT NULL,
    tenant_id   nvarchar(20) DEFAULT ('000000') NULL,
    post_code   nvarchar(64)                    NOT NULL,
    post_name   nvarchar(255)                   NOT NULL,
    post_sort   int                             NOT NULL,
    status      nchar(1)                        NOT NULL,
    create_dept bigint                          NULL,
    create_by   bigint                          NULL,
    create_time datetime2(7)                    NULL,
    update_by   bigint                          NULL,
    update_time datetime2(7)                    NULL,
    remark      nvarchar(500)                   NULL,
    CONSTRAINT PK__sys_post__3ED7876668E2D081 PRIMARY KEY CLUSTERED (post_id)
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
)
ON [PRIMARY]
GO

INSERT sys_post VALUES (1, N'000000', N'super-management', N'Quản lý cấp cao', 1, N'0', 103, 1, getdate(), NULL, NULL, N'')
GO
INSERT sys_post VALUES (2, N'000000', N'management', N'Quản lý', 2, N'0', 103, 1, getdate(), NULL, NULL, N'')
GO
INSERT sys_post VALUES (3, N'000000', N'staff', N'Nhân viên', 3, N'0', 103, 1, getdate(), NULL, NULL, N'')
GO

IF OBJECT_ID('sys_user', 'U') IS NOT NULL
  DROP TABLE sys_user;
GO
CREATE TABLE sys_user
(
    user_id     bigint                             NOT NULL,
    tenant_id   nvarchar(20)  DEFAULT ('000000')   NULL,
    cinema_id   bigint                             NOT NULL,
    dept_id     bigint                             NULL,
    user_name   nvarchar(40)                       NOT NULL,
    nick_name   nvarchar(255)                      NOT NULL,
    user_type   nvarchar(10)  DEFAULT ('sys_user') NULL,
    email       nvarchar(50)  DEFAULT ''           NULL,
    phonenumber nvarchar(11)  DEFAULT ''           NULL,
    sex         nchar(1)      DEFAULT ('0')        NULL,
    avatar      bigint                             NULL,
    password    nvarchar(100) DEFAULT ''           NULL,
    status      nchar(1)      DEFAULT ('0')        NULL,
    del_flag    nchar(1)      DEFAULT ('0')        NULL,
    login_ip    nvarchar(128) DEFAULT ''           NULL,
    login_date  datetime2(7)                       NULL,
    create_dept bigint                             NULL,
    create_by   bigint                             NULL,
    create_time datetime2(7)                       NULL,
    update_by   bigint                             NULL,
    update_time datetime2(7)                       NULL,
    remark      nvarchar(500)                      NULL,
    system_type nvarchar(30)  DEFAULT ('system')   NOT NULL,
    CONSTRAINT PK__sys_user__B9BE370F79170B6A PRIMARY KEY CLUSTERED (user_id)
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
)
ON [PRIMARY]
GO

INSERT sys_user VALUES (1, N'000000', 0, 100, N'admin', N'Administrator', N'sys_user', N'admin@gmail.com', N'0987654321', N'1', NULL, N'$2a$10$7JB720yubVSZvUI0rEqK/.VqGOZTH.ulu33dHOiBE8ByOhJIrdAu2', N'0', N'0', N'127.0.0.1', getdate(), 103, 1, getdate(), NULL, NULL, N'administrator', N'system')
GO
INSERT sys_user VALUES (2, N'000000', 1, 103, N'admin1', N'Lê Đình Hòa', N'sys_user', N'hoald1@gmail.com', N'0999999999', N'1', NULL, N'$2a$10$ASuKduzRhpJdv2be3MQWi.PIxMeNMokIfKJLWc2cP3k0sVhXEtb0K', N'0', N'0', N'127.0.0.1', getdate(), 103, 1, getdate(), NULL, NULL, N'', N'system')
GO
INSERT sys_user VALUES (3, N'000000', 2, 103, N'admin2', N'Lê Đình Hòa', N'sys_user', N'hoald2@gmail.com', N'0999999999', N'1', NULL, N'$2a$10$ASuKduzRhpJdv2be3MQWi.PIxMeNMokIfKJLWc2cP3k0sVhXEtb0K', N'0', N'0', N'127.0.0.1', getdate(), 103, 1, getdate(), NULL, NULL, N'', N'system')
GO
INSERT sys_user VALUES (4, N'000000', 3, 103, N'admin3', N'Lê Đình Hòa', N'sys_user', N'hoald3@gmail.com', N'0999999999', N'1', NULL, N'$2a$10$ASuKduzRhpJdv2be3MQWi.PIxMeNMokIfKJLWc2cP3k0sVhXEtb0K', N'0', N'0', N'127.0.0.1', getdate(), 103, 1, getdate(), NULL, NULL, N'', N'system')
GO

IF OBJECT_ID('sys_logininfor', 'U') IS NOT NULL
  DROP TABLE sys_logininfor;
GO
CREATE TABLE sys_logininfor
(
    info_id        bigint                      NOT NULL,
    tenant_id      nvarchar(20)  DEFAULT ('000000') NULL,
    user_name      nvarchar(255)  DEFAULT ''    NULL,
    ipaddr         nvarchar(128) DEFAULT ''    NULL,
    login_location nvarchar(255) DEFAULT ''    NULL,
    browser        nvarchar(50)  DEFAULT ''    NULL,
    os             nvarchar(50)  DEFAULT ''    NULL,
    status         nchar(1)      DEFAULT ('0') NULL,
    msg            nvarchar(255) DEFAULT ''    NULL,
    login_time     datetime2(7)                NULL,
    CONSTRAINT PK__sys_logi__3D8A9C1A1854AE10 PRIMARY KEY CLUSTERED (info_id)
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
)
ON [PRIMARY]
GO

CREATE NONCLUSTERED INDEX idx_sys_logininfor_s ON sys_logininfor (status)
GO
CREATE NONCLUSTERED INDEX idx_sys_logininfor_lt ON sys_logininfor (login_time)
GO

IF OBJECT_ID('sys_user_post', 'U') IS NOT NULL
  DROP TABLE sys_user_post;
GO
CREATE TABLE sys_user_post
(
    user_id bigint NOT NULL,
    post_id bigint NOT NULL,
    CONSTRAINT PK__sys_user__CA534F799C04589B PRIMARY KEY CLUSTERED (user_id, post_id)
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
)
ON [PRIMARY]
GO

INSERT sys_user_post VALUES (2, 1)
GO
INSERT sys_user_post VALUES (3, 1)
GO
INSERT sys_user_post VALUES (4, 1)
GO

IF OBJECT_ID('sys_user_role', 'U') IS NOT NULL
  DROP TABLE sys_user_role;
GO
CREATE TABLE sys_user_role
(
    user_id bigint NOT NULL,
    role_id bigint NOT NULL,
    CONSTRAINT PK__sys_user__6EDEA153FB34D8F0 PRIMARY KEY CLUSTERED (user_id, role_id)
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
)
ON [PRIMARY]
GO

INSERT sys_user_role VALUES (1, 1)
GO
INSERT sys_user_role VALUES (2, 1)
GO
INSERT sys_user_role VALUES (3, 1)
GO
INSERT sys_user_role VALUES (4, 1)
GO

IF OBJECT_ID('sys_oss', 'U') IS NOT NULL
  DROP TABLE sys_oss;
GO
CREATE TABLE sys_oss
(
    oss_id        bigint                          NOT NULL,
    tenant_id     nvarchar(20)  DEFAULT ('000000') NULL,
    file_name     nvarchar(255) DEFAULT ''        NOT NULL,
    original_name nvarchar(255) DEFAULT ''        NOT NULL,
    file_suffix   nvarchar(10)  DEFAULT ''        NOT NULL,
    url           nvarchar(500)                   NOT NULL,
    create_dept   bigint                          NULL,
    create_time   datetime2(7)                    NULL,
    create_by     bigint                          NULL,
    update_time   datetime2(7)                    NULL,
    update_by     bigint                          NULL,
    service       nvarchar(20)  DEFAULT ('minio') NOT NULL,
    CONSTRAINT PK__sys_oss__91241EA442389F0D PRIMARY KEY CLUSTERED (oss_id)
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
)
ON [PRIMARY]
GO

IF OBJECT_ID('sys_oss_config', 'U') IS NOT NULL
  DROP TABLE sys_oss_config;
GO
CREATE TABLE sys_oss_config
(
    oss_config_id bigint                      NOT NULL,
    tenant_id     nvarchar(20)  DEFAULT ('000000') NULL,
    config_key    nvarchar(20)  DEFAULT ''    NOT NULL,
    access_key    nvarchar(255) DEFAULT ''    NULL,
    secret_key    nvarchar(255) DEFAULT ''    NULL,
    bucket_name   nvarchar(255) DEFAULT ''    NULL,
    prefix        nvarchar(255) DEFAULT ''    NULL,
    endpoint      nvarchar(255) DEFAULT ''    NULL,
    domain        nvarchar(255) DEFAULT ''    NULL,
    is_https      nchar(1)      DEFAULT ('N') NULL,
    region        nvarchar(255) DEFAULT ''    NULL,
    access_policy nchar(1)      DEFAULT ('1') NOT NULL,
    status        nchar(1)      DEFAULT ('1') NULL,
    ext1          nvarchar(255) DEFAULT ''    NULL,
    create_dept   bigint                      NULL,
    create_by     bigint                      NULL,
    create_time   datetime2(7)                NULL,
    update_by     bigint                      NULL,
    update_time   datetime2(7)                NULL,
    remark        nvarchar(500)               NULL,
    CONSTRAINT PK__sys_oss___BFBDE87009ED2882 PRIMARY KEY CLUSTERED (oss_config_id)
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
)
ON [PRIMARY]
GO

INSERT INTO sys_oss_config VALUES (N'1', N'000000', N'minio', N'admin', N'admin123', N'admin', N'', N'127.0.0.1:9000', N'127.0.0.1:9000',N'N', N'', N'1', N'0', N'', 103, 1, getdate(), 1, getdate(), NULL)
GO
INSERT INTO sys_oss_config VALUES (N'2', N'000000', N'public_document', N'admin', N'admin123', N'admin', N'', N'127.0.0.1:9000', N'127.0.0.1:9000',N'N', N'', N'1', N'0', N'', 103, 1, getdate(), 1, getdate(), NULL)
GO

IF OBJECT_ID('sys_data_history', 'U') IS NOT NULL
    DROP TABLE sys_data_history;
GO
CREATE TABLE sys_data_history
(
    id            bigint         IDENTITY(1,1)      NOT NULL,
    tenant_id     nvarchar(20)   DEFAULT ('000000')     NULL,
    cinema_id     bigint                            NOT NULL,
    ref_id        bigint                            NOT NULL,
    new_value     nvarchar(1000) DEFAULT ''             NULL,
    old_value     nvarchar(1000) DEFAULT ''             NULL,
    data_field    nvarchar(50)   DEFAULT ''             NULL,
    hist_type     nvarchar(20)   DEFAULT ''         NOT NULL,
    table_name    nvarchar(50)   DEFAULT ''         NOT NULL,
    system_type   nvarchar(30)   DEFAULT ('system') NOT NULL,
    create_dept   bigint         DEFAULT (103)      NOT NULL,
    create_by     bigint         DEFAULT (1)        NOT NULL,
    create_time   datetime2(7)                      NOT NULL,
    update_by     bigint                                NULL,
    update_time   datetime2(7)                          NULL,
    CONSTRAINT PK__sys_data_history PRIMARY KEY CLUSTERED (id)
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
)
ON [PRIMARY]
GO

IF OBJECT_ID('sys_otp', 'U') IS NOT NULL
  DROP TABLE sys_otp;
GO
CREATE TABLE sys_otp
(
    id              bigint                              NOT NULL,
    tenant_id       nvarchar(20)    DEFAULT ('000000')  NULL,
    otp_code        nvarchar(10)                        NOT NULL,
    ref_id          bigint                              NOT NULL,
    phonenumber     nvarchar(11)  DEFAULT ''            NULL,
    expired_time    datetime2(7)                        NULL,
    otp_type        nvarchar(2)                         NULL,
    status          nchar(1)     DEFAULT ('0')          NULL,
    create_dept     bigint                              NULL,
    create_by       bigint                              NULL,
    create_time     datetime2(7)                        NULL,
    update_by       bigint                              NULL,
    update_time     datetime2(7)                        NULL,
    remark          nvarchar(255)                       NULL,
    system_type     nvarchar(30)  DEFAULT ('system')    NOT NULL,
    CONSTRAINT PK__sys_otp__3E82A5DB0EC94801 PRIMARY KEY CLUSTERED (id)
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
)
ON [PRIMARY]
GO

/******************************** ADDITION TABLES ********************************/

IF OBJECT_ID('cinema', 'U') IS NOT NULL
  DROP TABLE cinema;
GO
GO
CREATE TABLE cinema
(
	id                  bigint                              NOT NULL,
  tenant_id           nvarchar(20)    DEFAULT ('000000')  NULL,
	cinema_name         nvarchar(100)                       NOT NULL,
	cinema_address      nvarchar(255)                       NOT NULL,
  create_dept         bigint                              NULL,
  create_by           bigint                              NULL,
  create_time         datetime2(7)                        NULL,
  update_by           bigint                              NULL,
  update_time         datetime2(7)                        NULL,
  remark              nvarchar(255)                       NULL,
	CONSTRAINT PK__cinema__3E82A5DB0EC94801 PRIMARY KEY CLUSTERED (id)
      WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
      ON [PRIMARY]
)
ON [PRIMARY]
GO

IF OBJECT_ID('movie', 'U') IS NOT NULL
  DROP TABLE movie;
GO
CREATE TABLE movie
(
  id                  bigint                              NOT NULL,
  tenant_id           nvarchar(20)    DEFAULT ('000000')  NULL,
  title               nvarchar(100)                       NOT NULL,
  movie_description   nvarchar(500)                       NULL,
  release_date        datetime2(7)                        NOT NULL,
  end_date            datetime2(7)                        NOT NULL,
  duration            bigint                              NOT NULL,
  genre               nvarchar(100)                       NOT NULL,
  director            nvarchar(100)                       NOT NULL,
  rating              bigint                              NOT NULL,
  poster_url          nvarchar(500)                       NOT NULL,
  create_dept         bigint                              NULL,
  create_by           bigint                              NULL,
  create_time         datetime2(7)                        NULL,
  update_by           bigint                              NULL,
  update_time         datetime2(7)                        NULL,
  remark              nvarchar(255)                       NULL,
  CONSTRAINT PK__movie__3E82A5DB0EC94801 PRIMARY KEY CLUSTERED (id)
      WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
      ON [PRIMARY]
)
ON [PRIMARY]
GO

IF OBJECT_ID('hall', 'U') IS NOT NULL
  DROP TABLE hall;
GO
CREATE TABLE hall 
(
	id                  bigint                              NOT NULL,
  tenant_id           nvarchar(20)    DEFAULT ('000000')  NULL,
	hall_name           nvarchar(50)                        NOT NULL,
	cinema_id           bigint                              NOT NULL,
	capacity            bigint                              NULL,
	seat_number         bigint                              NULL,
  create_dept         bigint                              NULL,
  create_by           bigint                              NULL,
  create_time         datetime2(7)                        NULL,
  update_by           bigint                              NULL,
  update_time         datetime2(7)                        NULL,
  remark              nvarchar(255)                       NULL,
	CONSTRAINT PK__hall__3E82A5DB0EC94801 PRIMARY KEY CLUSTERED (id)
      WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
      ON [PRIMARY]
)
ON [PRIMARY]
GO

IF OBJECT_ID('showtime', 'U') IS NOT NULL
  DROP TABLE showtime;
GO
CREATE TABLE showtime
(
	id                  bigint                              NOT NULL,
  tenant_id           nvarchar(20)    DEFAULT ('000000')  NULL,
  cinema_id           bigint                              NOT NULL,
	movie_id            bigint                              NULL,
	hall_id bigint,
	start_time datetime not null,
	end_time datetime,
  create_dept         bigint                              NULL,
  create_by           bigint                              NULL,
  create_time         datetime2(7)                        NULL,
  update_by           bigint                              NULL,
  update_time         datetime2(7)                        NULL,
  remark              nvarchar(255)                       NULL,
	CONSTRAINT PK__showtime__3E82A5DB0EC94801 PRIMARY KEY CLUSTERED (id)
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
)
ON [PRIMARY]
GO

IF OBJECT_ID('seat_type', 'U') IS NOT NULL
  DROP TABLE seat_type;
GO
CREATE TABLE seat_type
(
	id                  bigint                              NOT NULL,
  tenant_id           nvarchar(20)    DEFAULT ('000000')  NULL,
	seat_name           nvarchar(50)                        NOT NULL,
	price               bigint                              NOT NULL,
  create_dept         bigint                              NULL,
  create_by           bigint                              NULL,
  create_time         datetime2(7)                        NULL,
  update_by           bigint                              NULL,
  update_time         datetime2(7)                        NULL,
  remark              nvarchar(255)                       NULL,
	CONSTRAINT PK__seat_type__3E82A5DB0EC94801 PRIMARY KEY CLUSTERED (id)
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
)
ON [PRIMARY]
GO

IF OBJECT_ID('seat', 'U') IS NOT NULL
  DROP TABLE seat;
GO
CREATE TABLE seat
(
	id                  bigint                              NOT NULL,
  tenant_id           nvarchar(20)    DEFAULT ('000000')  NULL,
	hall_id             bigint                              NOT NULL,
	seat_code           nvarchar(10)                        NOT NULL,
	seat_type_id        bigint                              NOT NULL,
  create_dept         bigint                              NULL,
  create_by           bigint                              NULL,
  create_time         datetime2(7)                        NULL,
  update_by           bigint                              NULL,
  update_time         datetime2(7)                        NULL,
  remark              nvarchar(255)                       NULL,
	CONSTRAINT PK__seat__3E82A5DB0EC94801 PRIMARY KEY CLUSTERED (id)
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
)
ON [PRIMARY]
GO

IF OBJECT_ID('customer', 'U') IS NOT NULL
  DROP TABLE customer;
GO
CREATE TABLE customer
(
	user_id             bigint                              NOT NULL,
  tenant_id           nvarchar(20)  DEFAULT ('000000')    NULL,
	customer_type       nvarchar(10)  DEFAULT ('sys_customer')  NULL,
	user_name           nvarchar(40)                        NOT NULL,
	password            nvarchar(100) DEFAULT ''                    NULL,
	nick_name           nvarchar(255)                       NOT NULL,
	email               nvarchar(50)  DEFAULT ''            NULL,
	phonenumber         nvarchar(11)  DEFAULT ''            NULL,
	sex                 nchar(1)      DEFAULT ('0')         NULL,
	avatar              bigint                              NULL,
	status              nchar(1)      DEFAULT ('0')         NULL,
	create_dept         bigint                              NULL,
  create_by           bigint                              NULL,
  create_time         datetime2(7)                        NULL,
  update_by           bigint                              NULL,
  update_time         datetime2(7)                        NULL,
  remark              nvarchar(500)                       NULL,
	CONSTRAINT PK__customer__3E82A5DB0EC94801 PRIMARY KEY CLUSTERED (id)
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
)
ON [PRIMARY]
GO

IF OBJECT_ID('promotion', 'U') IS NOT NULL
  DROP TABLE promotion;
GO
CREATE TABLE promotion
(
	id                  bigint                              NOT NULL,
  tenant_id           nvarchar(20)  DEFAULT ('000000')    NULL,
	title               nvarchar(100)                       NOT NULL,
	promotion_description nvarchar(255)                     NOT NULL,
  image_url           nvarchar(255)                       NULL,
	discount            bigint DEFAULT((0))                 NOT NULL,
	from_date           datetime2(7)                        NOT NULL,
	to_date             datetime2(7)                        NOT NULL,
  create_dept         bigint                              NULL,
  create_by           bigint                              NULL,
  create_time         datetime2(7)                        NULL,
  update_by           bigint                              NULL,
  update_time         datetime2(7)                        NULL,
  remark              nvarchar(500)                       NULL,
	CONSTRAINT PK__promotion__3E82A5DB0EC94801 PRIMARY KEY CLUSTERED (id)
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
)
ON [PRIMARY]
GO

INSERT promotion VALUES (1, N'000000', N'Ngày hội khuyến mãi ưu đãi thành viên', N'Diễn ra duy nhất ngày 11/11', N'https://ocwckgy6c1obj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/2/4/240x201-uu.jpg', 0, getdate(), getdate(), 103, 1, getdate(), NULL, NULL, 'TEST')
GO
INSERT promotion VALUES (2, N'000000', N'Ngày thứ tư vui vẻ', N'Diễn ra hàng tuần', N'https://ocwckgy6c1obj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/2/0/2023_happy_wed_75k_000_240x201.png', 0, getdate(), getdate(), 103, 1, getdate(), NULL, NULL, 'TEST')
GO
INSERT promotion VALUES (3, N'000000', N'Sinh nhật Star Cinema', N'Diễn ra hàng năm vào ngày 09/11', N'https://ocwckgy6c1obj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/b/i/birthday_popcorn_box_240x201.png', 0, getdate(), getdate(), 103, 1, getdate(), NULL, NULL, 'TEST')
GO
INSERT promotion VALUES (4, N'000000', N'Nâng cấp dịch vụ phòng chiếu', N'Sự kiện hot', N'https://ocwckgy6c1obj.vcdn.cloud/media/banner/cache/1/b58515f018eb873dafa430b6f9ae0c1e/u/2/u22-102023-240x201.jpg', 0, getdate(), getdate(), 103, 1, getdate(), NULL, NULL, 'TEST')
GO

IF OBJECT_ID('booking', 'U') IS NOT NULL
  DROP TABLE booking;
GO
CREATE TABLE booking
(
	id                  bigint                              NOT NULL,
  tenant_id           nvarchar(20)  DEFAULT ('000000')    NULL,
  cinema_id           bigint                              NOT NULL,
	customer_id         bigint                              NOT NULL,
	num_ticket          bigint                              NOT NULL,
	promotion_id        bigint                              NULL,
	total_price         bigint                              NOT NULL,
	payment_flag        nchar(1) DEFAULT('N')               NULL,
	showtime_id         bigint                              NOT NULL,
  create_time         datetime2(7)                        NULL,
	CONSTRAINT PK__booking__3E82A5DB0EC94801 PRIMARY KEY CLUSTERED (id)
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
)
ON [PRIMARY]
GO 

IF OBJECT_ID('booking_detail', 'U') IS NOT NULL
  DROP TABLE booking_detail;
GO
CREATE TABLE booking_detail
(
	id                  bigint                              NOT NULL,
  tenant_id           nvarchar(20)  DEFAULT ('000000')    NULL,
  cinema_id           bigint                              NOT NULL,
	booking_id          bigint                              NOT NULL,
	seat_id             bigint                              NOT NULL,
	CONSTRAINT PK__booking_detail__3E82A5DB0EC94801 PRIMARY KEY CLUSTERED (id)
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
)
ON [PRIMARY]
GO

IF OBJECT_ID('movie_rating', 'U') IS NOT NULL
  DROP TABLE movie_rating;
GO
CREATE TABLE movie_rating
(
	id                  bigint                              NOT NULL,
  tenant_id           nvarchar(20)  DEFAULT ('000000')    NULL,
	movie_id            bigint                              NOT NULL,
	star_number         bigint                              NOT NULL,
	customer_id         bigint                              NOT NULL,
	CONSTRAINT PK__movie_rating__3E82A5DB0EC94801 PRIMARY KEY CLUSTERED (id)
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
)
ON [PRIMARY]
GO
