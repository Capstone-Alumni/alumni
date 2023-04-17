'use client';

import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { Link } from '@mui/material';
import { Avatar, Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDeleteModal from '@share/components/ConfirmDeleteModal';
import { useDeleteNewsCommentMutation } from '@redux/slices/newsCommentSlice';
import NewsCommentInput from './NewsCommentInput';
import { NewsComment } from '../types';

const NewsCommentItem = ({
  item,
  user,
  newsId,
}: {
  item: NewsComment;
  user?: any;
  newsId: string;
}) => {
  const [showFullComment, setShowFullComment] = useState(false);
  const [isOverFlowText, setIsOverFlowText] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openEditComment, setOpenEditComment] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteNewsComment] = useDeleteNewsCommentMutation();
  const open = Boolean(anchorEl);
  const handleClickDropdown = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleReadMore = () => {
    setShowFullComment(!showFullComment);
  };
  const commentContentRef = useRef<HTMLElement>(null);

  const handleClickEdit = () => {
    setOpenEditComment(true);
  };

  const handleConfirmDelete = () => {
    setOpenDeleteModal(true);
  };

  const onDelete = async (commentId: string) => {
    await deleteNewsComment({ newsId: item.newsId, commentId: commentId });
  };

  const handleCancelEdit = () => {
    setOpenEditComment(false);
  };

  useEffect(() => {
    if (
      commentContentRef.current &&
      commentContentRef.current.scrollWidth >
        commentContentRef.current.clientWidth
    ) {
      setIsOverFlowText(true);
    } else {
      setIsOverFlowText(false);
    }
  }, [showFullComment, item.commentContent]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderBottom: '0.25px solid grey',
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Avatar
          alt={item.commenter ? item.commenter.information.fullName : ''}
          src={item.commenter ? item.commenter.information.avatarUrl : ''}
          sx={{ width: 48, height: 48 }}
        />
        <Box
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <Link
              underline="none"
              href={`/profile/${
                item.commenter ? item.commenter.information.id : ''
              }?profile_tab=information`}
              color="inherit"
            >
              <Typography
                sx={{
                  marginLeft: 2,
                  cursor: 'pointer',
                }}
                variant="subtitle1"
              >
                {item.commenter ? item.commenter.information.fullName : ''}
              </Typography>
            </Link>
            {(user && user.id === item.commenterId) ||
            user.accessLevel === 'SCHOOL_ADMIN' ? (
              <>
                <IconButton
                  onClick={handleClickDropdown}
                  size="small"
                  sx={{ ml: 'auto' }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <MoreVertIcon sx={{ width: 20, height: 20 }} />
                </IconButton>
                <MenuDropDown
                  open={open}
                  anchorEl={anchorEl}
                  onEdit={handleClickEdit}
                  canEdit={user.id === item.commenterId}
                  onDelete={handleConfirmDelete}
                  handleClose={handleClose}
                />
              </>
            ) : null}
          </Box>
          {!openEditComment ? (
            <Typography
              sx={{
                marginLeft: 2,
                maxWidth: 600,
              }}
              noWrap={!showFullComment}
              variant="body2"
              ref={commentContentRef}
            >
              {item.commentContent}
            </Typography>
          ) : (
            <NewsCommentInput
              initialData={item}
              user={user}
              handleCancel={handleCancelEdit}
              newsId={newsId}
            />
          )}
        </Box>
      </Box>
      {isOverFlowText && !showFullComment && !openEditComment ? (
        <Typography
          sx={{
            fontWeight: 600,
            color: 'blue',
            cursor: 'pointer',
            marginLeft: 'auto',
            fontSize: '12px',
          }}
          onClick={handleReadMore}
        >
          Xem thêm
        </Typography>
      ) : null}
      {showFullComment ? (
        <Typography
          sx={{
            fontWeight: 600,
            color: 'blue',
            cursor: 'pointer',
            marginLeft: 'auto',
            fontSize: '12px',
          }}
          onClick={handleReadMore}
        >
          Rút gọn
        </Typography>
      ) : null}
      <ConfirmDeleteModal
        open={openDeleteModal}
        title="Bạn muốn xoá bình luận này?"
        onClose={() => setOpenDeleteModal(false)}
        onDelete={() => onDelete(item.id)}
      />
    </Box>
  );
};

const MenuDropDown = ({
  anchorEl,
  open,
  onEdit,
  handleClose,
  onDelete,
  canEdit,
}: {
  anchorEl: any;
  open: boolean;
  handleClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  canEdit?: boolean;
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem disabled={!canEdit} onClick={onEdit}>
        <EditIcon sx={{ width: 16, height: 16, mr: 0.5 }} />
        Sửa
      </MenuItem>
      <MenuItem onClick={onDelete}>
        <DeleteIcon sx={{ width: 16, height: 16, mr: 0.5, color: 'red' }} />
        Xóa
      </MenuItem>
    </Menu>
  );
};

export default NewsCommentItem;
