import React from 'react';
import Navbar from '@/components/layouts/Navbar/Navbar';
import style from './editorlayout.module.scss';

interface Props {
  children: React.ReactNode;
}

const EditorLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className={style.editorShell}>
            <Navbar /> 
            <main className={style.editorMain}>
                {children}
            </main>
        </div>
    );
};

export default EditorLayout;